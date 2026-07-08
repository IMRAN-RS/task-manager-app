from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from ...core.database import get_db
from ...schemas.task import TaskCreate, TaskUpdate, TaskResponse
from ...services.task_service import TaskService
from ...models.task import StatusEnum, PriorityEnum
from .auth import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse)
def create_task(task_data: TaskCreate, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
	return TaskService.create_task(db, task_data, current_user.id)

@router.get("/", response_model=list[TaskResponse])
def get_tasks(
	status: Optional[StatusEnum] = Query(None, description="Filter by status"),
	priority: Optional[PriorityEnum] = Query(None, description="Filter by priority"),
	current_user = Depends(get_current_user),
	db: Session = Depends(get_db)
):
	return TaskService.get_tasks(db, current_user.id, status, priority)

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
	return TaskService.get_task(db, task_id, current_user.id)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, update_data: TaskUpdate, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
	return TaskService.update_task(db, task_id, current_user.id, update_data)

@router.delete("/{task_id}")
def delete_task(task_id: int, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
	return TaskService.delete_task(db, task_id, current_user.id)
