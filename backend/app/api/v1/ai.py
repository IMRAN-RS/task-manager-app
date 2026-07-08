from fastapi import APIRouter, Depends
from ...schemas.ai import AISuggestRequest, AISuggestResponse
from ...services.ai_service import AIService
from .auth import get_current_user

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/suggest", response_model=AISuggestResponse)
async def suggest_task(payload: AISuggestRequest, current_user = Depends(get_current_user)):
	return await AIService.generate_suggestion(payload.title)
