from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

def setup_exception_handlers(app: FastAPI):
	@app.exception_handler(RequestValidationError)
	async def validation_exception_handler(request: Request, exc: RequestValidationError):
		return JSONResponse(
			status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
			content={"detail": exc.errors()}
		)
	# Additional handlers can be added here
