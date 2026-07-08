from pydantic import BaseModel

class AISuggestRequest(BaseModel):
	title: str

class AISuggestResponse(BaseModel):
	description: str
	priority: str  # "LOW", "MEDIUM", "HIGH"
