from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from sqlalchemy import Column, String, Integer

from app.database.connection import Base


class User(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(Integer, primary_key=True, index=True)
    password = Column(String(100))
    activate = Column(Integer)
    perfil = Column(Integer)
    company = Column(Integer)
    username = Column(String(30))
