"""
Database engine, session factory, and table creation setup using SQLAlchemy.
"""
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import Generator

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./predictions.db")

# For SQLite, enable check_same_thread=False
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def init_db():
    """Initializes database tables and safe schema migrations."""
    Base.metadata.create_all(bind=engine)
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE prediction_history ADD COLUMN user_id INTEGER REFERENCES users(id)"))
            conn.commit()
        except Exception:
            pass


def get_db() -> Generator:
    """Dependency provider for database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
