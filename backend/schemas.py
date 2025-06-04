from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime

class Role(str, Enum):
    mentor = "mentor"
    learner = "learner"

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: Role
    skills: Optional[str]
    bio: Optional[str]

    class Config:
        orm_mode = True

class SessionCreate(BaseModel):
    mentor_id: int
    learner_id: int
    topic: str
    scheduled_time: datetime

class MessageCreate(BaseModel):
    sender_id: int
    receiver_id: int
    content: str
