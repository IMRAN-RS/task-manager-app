from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import auth, tasks, ai
from .core.database import engine, Base
from .utils.exceptions import setup_exception_handlers

# Create tables automatically (for development)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API", version="1.0.0")

# CORS – allow local development and deployed frontend
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000", "https://task-manager-app-vert-xi.vercel.app"],  # Update for production
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(tasks.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")

# Exception handlers
setup_exception_handlers(app)

@app.get("/")
def root():
	return {"message": "Task Manager API"}
