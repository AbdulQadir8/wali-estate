"""Dependencies for API endpoints."""
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import get_current_active_user, get_current_admin_user
from app.models.user import User

# Re-export dependencies
__all__ = ["get_db", "get_current_active_user", "get_current_admin_user"]
