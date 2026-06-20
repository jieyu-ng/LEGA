from typing import Dict, Any, List
import uuid

class KitaAIOrchestrator:
    def __init__(self):
        # In-memory storage for MVP, could use database
        self.cases: Dict[str, Dict[str, Any]] = {}

    def create_case(self, user_id: str, organisation_id: str) -> str:
        case_id = f"EK-{uuid.uuid4().hex[:8].upper()}"
        self.cases[case_id] = {
            "case_id": case_id,
            "user_id": user_id,
            "organisation_id": organisation_id,
            "workflow_type": "sme_assessment",
            "current_stage": "upload",
            "documents": [],
            "extracted_fields": [],
            "verified_facts": [],
            "user_constraints": {},
            "passport": None,
            "blocked_reasons": [],
            "user_action_required": False
        }
        return case_id

    def get_case(self, case_id: str) -> Dict[str, Any]:
        return self.cases.get(case_id)

    def advance_stage(self, case_id: str, next_stage: str):
        case = self.cases.get(case_id)
        if case:
            case["current_stage"] = next_stage
            
    def set_action_required(self, case_id: str, is_required: bool, reasons: List[str] = None):
        case = self.cases.get(case_id)
        if case:
            case["user_action_required"] = is_required
            case["blocked_reasons"] = reasons or []

orchestrator = KitaAIOrchestrator()
