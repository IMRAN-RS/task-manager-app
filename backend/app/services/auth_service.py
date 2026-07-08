from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserCreate, UserResponse
from ..schemas.auth import LoginRequest, TokenResponse
from ..core.security import verify_password, create_access_token, decode_access_token

class AuthService:
	@staticmethod
	def signup(db: Session, user_data: UserCreate):
		existing = UserRepository.get_by_email(db, user_data.email)
		if existing:
			raise HTTPException(status_code=400, detail="Email already registered")
		user = UserRepository.create(db, user_data)
		return UserResponse.model_validate(user)

	@staticmethod
	def login(db: Session, login_data: LoginRequest):
		user = UserRepository.get_by_email(db, login_data.email)
		if not user or not verify_password(login_data.password, user.hashed_password):
			raise HTTPException(status_code=401, detail="Invalid credentials")
		access_token = create_access_token(data={"sub": str(user.id)})
		return TokenResponse(access_token=access_token)

	@staticmethod
	def get_current_user(db: Session, token: str):
		payload = decode_access_token(token)
		if not payload:
			raise HTTPException(status_code=401, detail="Invalid token")
		user_id = payload.get("sub")
		if not user_id:
			raise HTTPException(status_code=401, detail="Invalid token")
		user = UserRepository.get_by_id(db, int(user_id))
		if not user:
			raise HTTPException(status_code=404, detail="User not found")
		return user
