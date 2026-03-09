import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base


class Agent(Base):
    """Real estate agent model."""
    __tablename__ = "agents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    phone = Column(String, nullable=True)
    
    # Profile
    bio = Column(Text, nullable=True)
    image = Column(String, nullable=True)  # URL to agent photo
    
    # Stats
    listings_count = Column(Integer, default=0)
    experience_years = Column(String, default="5+ Years")
    
    # Specialties (stored as JSON)
    specialties = Column(Text, default="[]")
    
    # Social links
    facebook = Column(String, nullable=True)
    twitter = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    properties = relationship("Property", back_populates="agent")
    
    def __repr__(self):
        return f"<Agent {self.name}>"
    
    def to_dict(self):
        """Convert agent to dictionary."""
        import json
        return {
            "id": self.id,
            "name": self.name,
            "title": self.title,
            "email": self.email,
            "phone": self.phone,
            "bio": self.bio,
            "image": self.image,
            "listings_count": self.listings_count,
            "experience_years": self.experience_years,
            "specialties": json.loads(self.specialties) if self.specialties else [],
            "facebook": self.facebook,
            "twitter": self.twitter,
            "linkedin": self.linkedin,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
