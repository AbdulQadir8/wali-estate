import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from app.db.database import Base


class PropertyType(str, enum.Enum):
    """Property type enum."""
    SALE = "sale"
    RENT = "rent"


class PropertyCategory(str, enum.Enum):
    """Property category enum."""
    RESIDENTIAL_PLOT = "Residential Plots"
    COMMERCIAL_PLOT = "Commercial Plots"
    HOUSE = "Houses"
    APARTMENT = "Apartments"
    VILLA = "Villas"
    FILE = "Files"


class PropertyStatus(str, enum.Enum):
    """Property status enum."""
    ACTIVE = "active"
    SOLD = "sold"
    RENTED = "rented"
    PENDING = "pending"
    INACTIVE = "inactive"


class Property(Base):
    """Property listing model."""
    __tablename__ = "properties"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    
    # Pricing
    price = Column(String, nullable=False)  # Stored as string (e.g., "PKR 25,000,000" or "On Call")
    price_numeric = Column(Float, nullable=True)  # For sorting/filtering
    
    # Location
    location = Column(String, nullable=False, index=True)
    address = Column(Text, nullable=True)
    city = Column(String, default="Lahore")
    phase = Column(String, nullable=True, index=True)  # DHA Phase
    block = Column(String, nullable=True)
    
    # Property Details
    property_type = Column(Enum(PropertyType), default=PropertyType.SALE)
    category = Column(Enum(PropertyCategory), default=PropertyCategory.RESIDENTIAL_PLOT)
    status = Column(Enum(PropertyStatus), default=PropertyStatus.ACTIVE, index=True)
    
    # Features
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    area = Column(String, nullable=True)  # e.g., "1 Kanal", "10 Marla"
    area_sqft = Column(Float, nullable=True)  # For calculations
    
    # Flags
    is_featured = Column(Boolean, default=False)
    is_hot = Column(Boolean, default=False)
    is_new = Column(Boolean, default=False)
    
    # Images (stored as JSON string)
    images = Column(Text, default="[]")  # JSON array of image URLs
    main_image = Column(String, nullable=True)
    
    # Features list (stored as JSON string)
    features = Column(Text, default="[]")  # JSON array of features
    
    # Agent/Contact
    agent_id = Column(String, ForeignKey("agents.id"), nullable=True)
    agent = relationship("Agent", back_populates="properties")
    
    # Created by
    created_by = Column(String, ForeignKey("users.id"), nullable=True)
    created_by_user = relationship("User", back_populates="properties", foreign_keys=[created_by])
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    listed_at = Column(DateTime, default=datetime.utcnow)
    sold_at = Column(DateTime, nullable=True)
    
    # SEO
    slug = Column(String, unique=True, index=True, nullable=True)
    meta_title = Column(String, nullable=True)
    meta_description = Column(Text, nullable=True)
    
    def __repr__(self):
        return f"<Property {self.title}>"
    
    def to_dict(self):
        """Convert property to dictionary."""
        import json
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "price_numeric": self.price_numeric,
            "location": self.location,
            "address": self.address,
            "city": self.city,
            "phase": self.phase,
            "block": self.block,
            "property_type": self.property_type.value if self.property_type else None,
            "category": self.category.value if self.category else None,
            "status": self.status.value if self.status else None,
            "bedrooms": self.bedrooms,
            "bathrooms": self.bathrooms,
            "area": self.area,
            "area_sqft": self.area_sqft,
            "is_featured": self.is_featured,
            "is_hot": self.is_hot,
            "is_new": self.is_new,
            "images": json.loads(self.images) if self.images else [],
            "main_image": self.main_image,
            "features": json.loads(self.features) if self.features else [],
            "agent_id": self.agent_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "listed_at": self.listed_at.isoformat() if self.listed_at else None,
            "sold_at": self.sold_at.isoformat() if self.sold_at else None,
            "slug": self.slug,
        }
