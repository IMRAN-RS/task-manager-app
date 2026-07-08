from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...schemas.user import UserCreate, UserResponse
from ...schemas.auth import LoginRequest, TokenResponse
from ...services.auth_service import AuthService
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
	token = credentials.credentials
	user = AuthService.get_current_user(db, token)
	return user

@router.post("/signup", response_model=UserResponse)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
	return AuthService.signup(db, user_data)

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
	return AuthService.login(db, login_data)

@router.get("/me", response_model=UserResponse)
def get_me(current_user = Depends(get_current_user)):
	return current_user
