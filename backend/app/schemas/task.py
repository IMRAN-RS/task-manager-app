from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from ..models.task import PriorityEnum, StatusEnum

class TaskBase(BaseModel):
	title: str
	description: Optional[str] = None
	due_date: Optional[datetime] = None
	priority: PriorityEnum = PriorityEnum.MEDIUM
	status: StatusEnum = StatusEnum.TODO

class TaskCreate(TaskBase):
	pass

class TaskUpdate(BaseModel):
	title: Optional[str] = None
	description: Optional[str] = None
	due_date: Optional[datetime] = None
	priority: Optional[PriorityEnum] = None
	status: Optional[StatusEnum] = None

class TaskResponse(TaskBase):
	id: int
	created_at: datetime
	updated_at: datetime
	user_id: int

	class Config:
		from_attributes = True
