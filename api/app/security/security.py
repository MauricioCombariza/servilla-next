from sqlalchemy.orm import Session

from fastapi.params import Depends

from passlib.context import CryptContext

from app.database.connection import get_session
from app.models.users import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(email: str, db: Session = Depends(get_session)):
    return db.filter(User.email == email)


def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user
