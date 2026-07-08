from sqlalchemy.orm import Session
from ..models.user import User
from ..schemas.user import UserCreate
from ..core.security import get_password_hash

class UserRepository:
	@staticmethod
	def get_by_email(db: Session, email: str):
		return db.query(User).filter(User.email == email).first()

	@staticmethod
	def get_by_id(db: Session, user_id: int):
		return db.query(User).filter(User.id == user_id).first()

	@staticmethod
	def create(db: Session, user_data: UserCreate):
		hashed = get_password_hash(user_data.password)
		db_user = User(
			name=user_data.name,
			email=user_data.email,
			hashed_password=hashed
		)
		db.add(db_user)
		db.commit()
		db.refresh(db_user)
		return db_user
