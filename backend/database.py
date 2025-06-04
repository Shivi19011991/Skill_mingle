from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Change this to match your MySQL credentials
DATABASE_URL = "mysql+pymysql://root:@localhost/skillmingle_schema"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

# Add this
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Connected and tables created!")
except Exception as e:
    print("❌ Error creating tables:", e)
