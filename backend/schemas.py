from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class ExtractionField(BaseModel):
    name: str
    value: Any
    unit: Optional[str] = None
    page: Optional[int] = None
    confidence: float
    status: str

class DocumentExtractionResponse(BaseModel):
    document_id: str
    fields: List[ExtractionField]
    warnings: List[str] = []

class BusyPeriod(BaseModel):
    start: str
    end: str

class BusinessContextInput(BaseModel):
    busy_periods: List[BusyPeriod]
    flexible_equipment: List[str]
    non_flexible_equipment: List[str]
    maximum_delay_minutes: int
    confidence: float

class ValidationIssue(BaseModel):
    field: str
    reason: str

class DataValidationResponse(BaseModel):
    validation_status: str
    approved_fields: List[str]
    rejected_fields: List[str]
    issues: List[ValidationIssue]

class Finding(BaseModel):
    statement: str
    evidence_type: str
    confidence: float
    requires_confirmation: Optional[bool] = False

class EnergyAnalystResponse(BaseModel):
    findings: List[Finding]

class FlexibleLoadRange(BaseModel):
    minimum: float
    maximum: float

class PreferredWindow(BaseModel):
    start: str
    end: str

class FlexibilityPassportResponse(BaseModel):
    business_id: str
    energy_profile: str
    flexible_load_range_kwh: FlexibleLoadRange
    preferred_windows: List[PreferredWindow]
    community_fit_score: float
    confidence: float
    evidence_level: str

class OptimisationResult(BaseModel):
    local_solar_utilisation_before: float
    local_solar_utilisation_after: float
    grid_import_before_kwh: float
    grid_import_after_kwh: float
    estimated_daily_value_rm: float

class OptimisationScheduleResponse(BaseModel):
    mode: str
    schedule: List[Dict[str, Any]]
    results: OptimisationResult

class AuditViolation(BaseModel):
    type: str
    message: str

class AuditResponse(BaseModel):
    audit_status: str
    violations: List[AuditViolation]
    required_action: Optional[str] = None

class ExplanationResponse(BaseModel):
    headline: str
    why: str
    action_steps: List[str]
    confidence_label: str

class SharedCaseState(BaseModel):
    case_id: str
    user_id: str
    organisation_id: str
    workflow_type: str
    documents: List[Any] = []
    verified_facts: List[Any] = []
    user_constraints: List[Any] = []
    assumptions: List[Any] = []
    missing_information: List[Any] = []
    agent_outputs: List[Any] = []
    confidence_scores: Dict[str, float] = {}
    optimisation_result: Optional[Any] = None
    audit_status: str = "pending"
    human_approval: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
