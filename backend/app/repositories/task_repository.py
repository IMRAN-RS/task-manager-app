from sqlalchemy.orm import Session
from typing import Optional, List
from ..models.task import Task
from ..schemas.task import TaskCreate, TaskUpdate

class TaskRepository:
	@staticmethod
	def create(db: Session, task_data: TaskCreate, user_id: int):
		db_task = Task(**task_data.model_dump(), user_id=user_id)
		db.add(db_task)
		db.commit()
		db.refresh(db_task)
		return db_task

	@staticmethod
	def get_by_id(db: Session, task_id: int, user_id: int):
		return db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()

	@staticmethod
	def get_all(db: Session, user_id: int, status: Optional[str] = None, priority: Optional[str] = None):
		query = db.query(Task).filter(Task.user_id == user_id)
		if status:
			query = query.filter(Task.status == status)
		if priority:
			query = query.filter(Task.priority == priority)
		return query.all()

	@staticmethod
	def update(db: Session, db_task: Task, update_data: TaskUpdate):
		for key, value in update_data.model_dump(exclude_unset=True).items():
			setattr(db_task, key, value)
		db.commit()
		db.refresh(db_task)
		return db_task

	@staticmethod
	def delete(db: Session, db_task: Task):
		db.delete(db_task)
		db.commit()
