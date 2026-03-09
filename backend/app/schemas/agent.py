from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class AgentBase(BaseModel):
    """Base agent schema."""
    name: str = Field(..., min_length=2, max_length=100)
    title: str = Field(..., min_length=2, max_length=100)
    email: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    experience_years: str = "5+ Years"
    specialties: List[str] = []
    facebook: Optional[str] = None
    twitter: Optional[str] = None
    linkedin: Optional[str] = None


class AgentCreate(AgentBase):
    """Agent creation schema."""
    image: Optional[str] = None


class AgentUpdate(BaseModel):
    """Agent update schema."""
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    title: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None
    experience_years: Optional[str] = None
    specialties: Optional[List[str]] = None
    facebook: Optional[str] = None
    twitter: Optional[str] = None
    linkedin: Optional[str] = None


class AgentResponse(AgentBase):
    """Agent response schema."""
    id: str
    image: Optional[str]
    listings_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True
