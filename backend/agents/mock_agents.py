from typing import Dict, Any, List
import datetime

class MockDocumentIntelligenceAgent:
    def extract_bill(self, file_path: str) -> Dict[str, Any]:
        # Simulates Aisyah's Laundromat scenario from the PRD
        return {
            "document_id": "bill-may-2026",
            "fields": [
                {
                    "name": "billing_month",
                    "value": "May 2026",
                    "unit": None,
                    "page": 1,
                    "confidence": 0.98,
                    "status": "extracted"
                },
                {
                    "name": "consumption_kwh",
                    "value": 1420,
                    "unit": "kWh",
                    "page": 1,
                    "confidence": 0.98,
                    "status": "extracted"
                },
                {
                    "name": "total_amount_rm",
                    "value": 980.0,
                    "unit": "RM",
                    "page": 1,
                    "confidence": 0.65, # Intentionally low to trigger verification
                    "status": "extracted"
                }
            ],
            "warnings": []
        }

class MockBusinessContextAgent:
    def extract_context(self, text: str) -> Dict[str, Any]:
        return {
            "busy_periods": [{"start": "12:00", "end": "14:00"}],
            "flexible_equipment": ["washing_machines"],
            "non_flexible_equipment": ["customer_dryers"],
            "maximum_delay_minutes": 120,
            "confidence": 0.87
        }

class DataValidationAgent:
    def validate(self, fields: List[Dict[str, Any]]) -> Dict[str, Any]:
        approved = []
        rejected = []
        needs_confirmation = False
        
        for field in fields:
            if field["confidence"] < 0.8:
                needs_confirmation = True
                rejected.append(field["name"])
            else:
                approved.append(field["name"])
                
        status = "needs_confirmation" if needs_confirmation else "verified"
        return {
            "validation_status": status,
            "approved_fields": approved,
            "rejected_fields": rejected,
            "issues": [{"field": f, "reason": "Low confidence, user confirmation required."} for f in rejected]
        }

class FlexibilityPassportAgent:
    def generate_passport(self, context: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "business_id": "sme-001",
            "energy_profile": "variable_machine_load",
            "flexible_load_range_kwh": {
                "minimum": 15.0,
                "maximum": 25.0
            },
            "preferred_windows": [
                {"start": "11:00", "end": "16:00"}
            ],
            "community_fit_score": 82.0,
            "confidence": 0.76,
            "evidence_level": "inferred"
        }
