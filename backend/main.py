from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from backend import models, database
from backend.routers import users, sessions, messages
from sqlalchemy.orm import session

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables
models.Base.metadata.create_all(bind=database.engine)

# Include API routers
app.include_router(users.router)
app.include_router(sessions.router)
app.include_router(messages.router)

# Dependency to get the SQLAlchemy session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()
