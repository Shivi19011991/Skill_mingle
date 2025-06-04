from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend import models, schemas, database
from typing import List


router = APIRouter()

@router.post("/api/messages", response_model=schemas.MessageCreate)
def send_message(message: schemas.MessageCreate, db: Session = Depends(database.get_db)):
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/api/messages/{user_id}", response_model=List[schemas.MessageCreate])
def get_messages(user_id: int, db: Session = Depends(database.get_db)):
    db_messages = db.query(models.Message).filter(models.Message.receiver_id == user_id).all()
    return db_messages
