from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend import models, schemas, database

router = APIRouter()

@router.post("/api/sessions", response_model=schemas.SessionCreate)
def create_session(session: schemas.SessionCreate, db: Session = Depends(database.get_db)):
    db_session = models.Session(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@router.get("/api/sessions/{session_id}", response_model=schemas.SessionCreate)
def get_session(session_id: int, db: Session = Depends(database.get_db)):
    db_session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if db_session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return db_session
