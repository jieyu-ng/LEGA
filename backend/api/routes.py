from fastapi import APIRouter, HTTPException, BackgroundTasks, File, UploadFile
from pydantic import BaseModel
from typing import List, Dict, Any

from agents.orchestrator import orchestrator
from agents.mock_agents import (
    MockDocumentIntelligenceAgent,
    MockBusinessContextAgent,
    DataValidationAgent,
    FlexibilityPassportAgent
)
from optimisation.engine import OptimisationEngine
from schemas import DocumentExtractionResponse, BusinessContextInput, DataValidationResponse, FlexibilityPassportResponse, OptimisationScheduleResponse

router = APIRouter()

class CreateCaseRequest(BaseModel):
    user_id: str
    organisation_id: str

@router.post("/cases")
def create_case(req: CreateCaseRequest):
    case_id = orchestrator.create_case(req.user_id, req.organisation_id)
    return {"case_id": case_id}

@router.post("/cases/{case_id}/extract", response_model=DocumentExtractionResponse)
async def extract_document(case_id: str, file: UploadFile = File(...)):
    case = orchestrator.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    contents = await file.read()
    
    # Using real/mock agent
    doc_agent = MockDocumentIntelligenceAgent()
    extraction_result = doc_agent.extract_bill(file_content=contents, content_type=file.content_type)
    
    # Store extracted fields in case
    case["extracted_fields"] = extraction_result["fields"]
    
    # Run validation immediately
    val_agent = DataValidationAgent()
    val_result = val_agent.validate(extraction_result["fields"])
    
    if val_result["validation_status"] == "needs_confirmation":
        orchestrator.set_action_required(case_id, True, val_result["rejected_fields"])
        orchestrator.advance_stage(case_id, "verification")
    else:
        orchestrator.set_action_required(case_id, False)
        case["verified_facts"] = extraction_result["fields"]
        orchestrator.advance_stage(case_id, "business_context")
        
    return extraction_result

@router.get("/cases/{case_id}/validation", response_model=DataValidationResponse)
def get_validation_status(case_id: str):
    case = orchestrator.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    val_agent = DataValidationAgent()
    return val_agent.validate(case.get("extracted_fields", []))

@router.post("/cases/{case_id}/confirm-fields")
def confirm_fields(case_id: str, confirmed_fields: List[Dict[str, Any]]):
    case = orchestrator.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    # User confirmed fields, move them to verified
    case["verified_facts"] = confirmed_fields
    orchestrator.set_action_required(case_id, False)
    orchestrator.advance_stage(case_id, "business_context")
    return {"status": "success"}

@router.post("/cases/{case_id}/business-context")
def add_business_context(case_id: str, context: BusinessContextInput):
    case = orchestrator.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    case["user_constraints"] = context.dict()
    orchestrator.advance_stage(case_id, "analysis")
    return {"status": "success"}

@router.post("/cases/{case_id}/passport", response_model=FlexibilityPassportResponse)
def generate_passport(case_id: str):
    case = orchestrator.get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    agent = FlexibilityPassportAgent()
    passport = agent.generate_passport(case["user_constraints"])
    case["passport"] = passport
    orchestrator.advance_stage(case_id, "completed")
    return passport

@router.post("/scenarios/{scenario_id}/optimise", response_model=OptimisationScheduleResponse)
def optimise_scenario(scenario_id: str, protect_busy_period: bool = False):
    engine = OptimisationEngine()
    result = engine.run_optimisation({"protect_busy_period": protect_busy_period})
    
    if result["status"] == "infeasible":
        raise HTTPException(status_code=400, detail="Optimization infeasible with current constraints")
        
    return {
        "mode": "balanced",
        "schedule": result["schedule"],
        "results": result["results"]
    }
