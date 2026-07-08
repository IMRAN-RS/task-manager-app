import google.generativeai as genai
from fastapi import HTTPException
from ..core.config import settings
from ..schemas.ai import AISuggestResponse
import json
import re

genai.configure(api_key=settings.GEMINI_API_KEY)

class AIService:
	@staticmethod
	async def generate_suggestion(title: str) -> AISuggestResponse:
		prompt = f"""
		You are a task management assistant. Given a rough task title, generate a detailed professional description and suggest a priority level (LOW, MEDIUM, HIGH).

		Task title: "{title}"

		Respond in valid JSON format:
		{{"description": "generated description", "priority": "HIGH"}}
		"""
		model = genai.GenerativeModel('gemini-2.5-flash')
		response = model.generate_content(prompt)
		raw_text = response.text.strip()

		# Extract JSON from Markdown code blocks or raw text
		match = re.search(r'\{.*\}', raw_text, re.DOTALL)
		if match:
			raw_text = match.group(0)

		try:
			data = json.loads(raw_text)
			return AISuggestResponse(
				description=data.get("description", ""),
				priority=data.get("priority", "MEDIUM")
			)
		except Exception as exc:
			raise HTTPException(status_code=502, detail=f"AI suggestion failed: {exc}")
