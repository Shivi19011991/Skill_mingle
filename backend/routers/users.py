from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from backend import models, schemas, auth, database

router = APIRouter()

@router.post("/api/signup", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Hash the password
    hashed_password = auth.hash_password(user.password)
    
    # Create the new user
    db_user = models.User(username=user.username, email=user.email, password=hashed_password, role=user.role, skills=user.skills, bio=user.bio)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/api/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate JWT token
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/api/users/{username}", response_model=schemas.UserOut)
def get_user(username: str, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == username).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user
