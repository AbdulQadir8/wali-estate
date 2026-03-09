from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class PropertyType(str, Enum):
    """Property type enum."""
    SALE = "sale"
    RENT = "rent"


class PropertyCategory(str, Enum):
    """Property category enum."""
    RESIDENTIAL_PLOT = "Residential Plots"
    COMMERCIAL_PLOT = "Commercial Plots"
    HOUSE = "Houses"
    APARTMENT = "Apartments"
    VILLA = "Villas"
    FILE = "Files"


class PropertyStatus(str, Enum):
    """Property status enum."""
    ACTIVE = "active"
    SOLD = "sold"
    RENTED = "rented"
    PENDING = "pending"
    INACTIVE = "inactive"


class PropertyBase(BaseModel):
    """Base property schema."""
    title: str = Field(..., min_length=5, max_length=200)
    description: Optional[str] = None
    price: str = Field(..., min_length=1, max_length=100)
    price_numeric: Optional[float] = None
    location: str = Field(..., min_length=3, max_length=200)
    address: Optional[str] = None
    city: str = "Lahore"
    phase: Optional[str] = None
    block: Optional[str] = None
    property_type: PropertyType = PropertyType.SALE
    category: PropertyCategory = PropertyCategory.RESIDENTIAL_PLOT
    bedrooms: Optional[int] = Field(None, ge=0, le=20)
    bathrooms: Optional[int] = Field(None, ge=0, le=20)
    area: Optional[str] = None
    area_sqft: Optional[float] = None
    is_featured: bool = False
    is_hot: bool = False
    is_new: bool = False
    features: List[str] = []
    agent_id: Optional[str] = None


class PropertyCreate(PropertyBase):
    """Property creation schema."""
    images: List[str] = []
    main_image: Optional[str] = None


class PropertyUpdate(BaseModel):
    """Property update schema."""
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    description: Optional[str] = None
    price: Optional[str] = Field(None, min_length=1, max_length=100)
    price_numeric: Optional[float] = None
    location: Optional[str] = Field(None, min_length=3, max_length=200)
    address: Optional[str] = None
    city: Optional[str] = None
    phase: Optional[str] = None
    block: Optional[str] = None
    property_type: Optional[PropertyType] = None
    category: Optional[PropertyCategory] = None
    status: Optional[PropertyStatus] = None
    bedrooms: Optional[int] = Field(None, ge=0, le=20)
    bathrooms: Optional[int] = Field(None, ge=0, le=20)
    area: Optional[str] = None
    area_sqft: Optional[float] = None
    is_featured: Optional[bool] = None
    is_hot: Optional[bool] = None
    is_new: Optional[bool] = None
    images: Optional[List[str]] = None
    main_image: Optional[str] = None
    features: Optional[List[str]] = None
    agent_id: Optional[str] = None


class PropertyResponse(PropertyBase):
    """Property response schema."""
    id: str
    status: PropertyStatus
    images: List[str]
    main_image: Optional[str]
    features: List[str]
    slug: Optional[str]
    created_at: datetime
    updated_at: datetime
    listed_at: datetime
    sold_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class PropertyListResponse(BaseModel):
    """Property list response schema."""
    items: List[PropertyResponse]
    total: int
    page: int
    page_size: int
    pages: int


class PropertyFilter(BaseModel):
    """Property filter schema."""
    search: Optional[str] = None
    property_type: Optional[PropertyType] = None
    category: Optional[PropertyCategory] = None
    status: Optional[PropertyStatus] = PropertyStatus.ACTIVE
    location: Optional[str] = None
    phase: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    bedrooms: Optional[int] = None
    is_hot: Optional[bool] = None
    is_new: Optional[bool] = None
    is_featured: Optional[bool] = None
    agent_id: Optional[str] = None
    page: int = 1
    page_size: int = 10
    sort_by: str = "created_at"
    sort_order: str = "desc"


class PropertyStatusUpdate(BaseModel):
    """Property status update schema."""
    status: PropertyStatus
    
    
class MarkAsSoldRequest(BaseModel):
    """Mark property as sold request."""
    sold_price: Optional[str] = None
    notes: Optional[str] = None
