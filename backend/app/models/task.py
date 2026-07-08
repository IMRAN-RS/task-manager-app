from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base

class PriorityEnum(enum.Enum):
	LOW = "LOW"
	MEDIUM = "MEDIUM"
	HIGH = "HIGH"

class StatusEnum(enum.Enum):
	TODO = "TODO"
	IN_PROGRESS = "IN_PROGRESS"
	DONE = "DONE"

class Task(Base):
	__tablename__ = "tasks"

	id = Column(Integer, primary_key=True, index=True)
	title = Column(String, nullable=False)
	description = Column(String, nullable=True)
	due_date = Column(DateTime, nullable=True)
	priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM)
	status = Column(Enum(StatusEnum), default=StatusEnum.TODO)
	created_at = Column(DateTime, default=datetime.utcnow)
	updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

	owner = relationship("User", back_populates="tasks")
