from typing import Dict, Any, List
import datetime
import os
import base64
import json
import requests

class MockDocumentIntelligenceAgent:
    def extract_bill_mock(self) -> Dict[str, Any]:
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

    #Gemini APi or Grafilab API call
    def extract_bill(self, file_path: str = None, file_content: bytes = None, content_type: str = None) -> Dict[str, Any]:
        # If no file content is provided, fall back to mock data
        if not file_content:
            return self.extract_bill_mock()

        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            print("WARNING: GEMINI_API_KEY environment variable not found. Falling back to static mock data.")
            return self.extract_bill_mock()

        try:
            # Encode file contents to base64
            base64_data = base64.b64encode(file_content).decode("utf-8")
            
            # Call Gemini 2.5 Flash
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
            
            prompt = (
                "You are a utility bill extraction agent. Extract the following fields from this utility bill:\n"
                "1. billing_month (the month and year of the bill, e.g. 'May 2026' or 'May-26')\n"
                "2. consumption_kwh (the electricity consumption in kWh, e.g. 1420)\n"
                "3. total_amount_rm (the total cost or amount due in RM / Ringgit Malaysia, e.g. 980.00)\n\n"
                "Return the extraction result in JSON format conforming to the response schema. "
                "For the fields array, name must be exactly 'billing_month', 'consumption_kwh', or 'total_amount_rm'."
            )

            schema = {
                "type": "OBJECT",
                "properties": {
                    "document_id": {"type": "STRING", "description": "Unique identifier for the document, e.g., bill-may-2026"},
                    "fields": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "name": {"type": "STRING", "description": "Exactly 'billing_month', 'consumption_kwh', or 'total_amount_rm'"},
                                "value": {"type": "STRING", "description": "Extracted text value"},
                                "unit": {"type": "STRING", "description": "Unit of the field, e.g. 'kWh' or 'RM' or null"},
                                "page": {"type": "INTEGER", "description": "Page number where field was found (usually 1)"},
                                "confidence": {"type": "NUMBER", "description": "Confidence score from 0.0 to 1.0 based on readability"},
                                "status": {"type": "STRING", "description": "Status, usually 'extracted'"}
                            },
                            "required": ["name", "value", "confidence", "status"]
                        }
                    },
                    "warnings": {
                        "type": "ARRAY",
                        "items": {"type": "STRING"}
                    }
                },
                "required": ["document_id", "fields", "warnings"]
            }

            payload = {
                "contents": [
                    {
                        "parts": [
                            {
                                "inlineData": {
                                    "mimeType": content_type or "application/pdf",
                                    "data": base64_data
                                }
                            },
                            {
                                "text": prompt
                            }
                        ]
                    }
                ],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": schema
                }
            }

            response = requests.post(url, json=payload, timeout=30.0)
            response.raise_for_status()
            
            response_json = response.json()
            text_content = response_json["candidates"][0]["content"]["parts"][0]["text"]
            result = json.loads(text_content)

            # Post-process types to make sure they match schemas/models (e.g. floats and ints)
            for field in result.get("fields", []):
                val_str = str(field.get("value", "")).strip()
                if field.get("name") in ("consumption_kwh", "total_amount_rm"):
                    try:
                        clean_val = val_str.replace(",", "").replace("RM", "").strip()
                        if "." in clean_val:
                            field["value"] = float(clean_val)
                        else:
                            field["value"] = int(clean_val)
                    except ValueError:
                        # Keep it as string if parsing fails
                        field["value"] = val_str
                else:
                    field["value"] = val_str

            return result

        except Exception as e:
            print(f"Error calling Gemini API: {str(e)}. Falling back to static mock data.")
            return self.extract_bill_mock()

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
