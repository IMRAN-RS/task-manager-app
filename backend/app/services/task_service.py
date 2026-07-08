from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Optional, List
from ..repositories.task_repository import TaskRepository
from ..schemas.task import TaskCreate, TaskUpdate, TaskResponse

class TaskService:
	@staticmethod
	def create_task(db: Session, task_data: TaskCreate, user_id: int):
		db_task = TaskRepository.create(db, task_data, user_id)
		return TaskResponse.model_validate(db_task)

	@staticmethod
	def get_task(db: Session, task_id: int, user_id: int):
		db_task = TaskRepository.get_by_id(db, task_id, user_id)
		if not db_task:
			raise HTTPException(status_code=404, detail="Task not found")
		return TaskResponse.model_validate(db_task)

	@staticmethod
	def get_tasks(db: Session, user_id: int, status: Optional[str] = None, priority: Optional[str] = None):
		tasks = TaskRepository.get_all(db, user_id, status, priority)
		return [TaskResponse.model_validate(t) for t in tasks]

	@staticmethod
	def update_task(db: Session, task_id: int, user_id: int, update_data: TaskUpdate):
		db_task = TaskRepository.get_by_id(db, task_id, user_id)
		if not db_task:
			raise HTTPException(status_code=404, detail="Task not found")
		updated = TaskRepository.update(db, db_task, update_data)
		return TaskResponse.model_validate(updated)

	@staticmethod
	def delete_task(db: Session, task_id: int, user_id: int):
		db_task = TaskRepository.get_by_id(db, task_id, user_id)
		if not db_task:
			raise HTTPException(status_code=404, detail="Task not found")
		TaskRepository.delete(db, db_task)
		return {"message": "Task deleted"}
