from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.orm import Session
import json

from app.api.deps import get_db, get_current_active_user, get_current_admin_user
from app.schemas.property import (
    PropertyCreate, 
    PropertyUpdate, 
    PropertyResponse, 
    PropertyListResponse,
    PropertyFilter,
    PropertyType,
    PropertyCategory,
    PropertyStatus,
    MarkAsSoldRequest
)
from app.services.property_service import PropertyService
from app.models.user import User
from app.core.config import settings
import os
import uuid

router = APIRouter()


@router.get("/", response_model=PropertyListResponse)
def list_properties(
    search: Optional[str] = Query(None, description="Search in title, location, description"),
    property_type: Optional[PropertyType] = Query(None, description="Filter by type (sale/rent)"),
    category: Optional[PropertyCategory] = Query(None, description="Filter by category"),
    status: Optional[PropertyStatus] = Query(PropertyStatus.ACTIVE, description="Filter by status"),
    location: Optional[str] = Query(None, description="Filter by location"),
    phase: Optional[str] = Query(None, description="Filter by DHA phase"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    bedrooms: Optional[int] = Query(None, description="Minimum bedrooms"),
    is_hot: Optional[bool] = Query(None, description="Hot listings only"),
    is_new: Optional[bool] = Query(None, description="New listings only"),
    is_featured: Optional[bool] = Query(None, description="Featured listings only"),
    agent_id: Optional[str] = Query(None, description="Filter by agent"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("created_at", description="Sort field"),
    sort_order: str = Query("desc", description="Sort order (asc/desc)"),
    db: Session = Depends(get_db)
):
    """Get all properties with filtering and pagination."""
    filters = PropertyFilter(
        search=search,
        property_type=property_type,
        category=category,
        status=status,
        location=location,
        phase=phase,
        min_price=min_price,
        max_price=max_price,
        bedrooms=bedrooms,
        is_hot=is_hot,
        is_new=is_new,
        is_featured=is_featured,
        agent_id=agent_id,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )
    
    properties, total = PropertyService.get_properties(db, filters)
    
    pages = (total + page_size - 1) // page_size
    
    return PropertyListResponse(
        items=[prop.to_dict() for prop in properties],
        total=total,
        page=page,
        page_size=page_size,
        pages=pages
    )


@router.get("/featured", response_model=List[PropertyResponse])
def get_featured_properties(
    limit: int = Query(6, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Get featured properties."""
    properties = PropertyService.get_featured_properties(db, limit)
    return [prop.to_dict() for prop in properties]


@router.get("/hot", response_model=List[PropertyResponse])
def get_hot_properties(
    limit: int = Query(6, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Get hot properties."""
    properties = PropertyService.get_hot_properties(db, limit)
    return [prop.to_dict() for prop in properties]


@router.get("/new", response_model=List[PropertyResponse])
def get_new_properties(
    limit: int = Query(6, ge=1, le=20),
    db: Session = Depends(get_db)
):
    """Get new properties."""
    properties = PropertyService.get_new_properties(db, limit)
    return [prop.to_dict() for prop in properties]


@router.get("/stats")
def get_property_stats(
    db: Session = Depends(get_db)
):
    """Get property statistics."""
    return PropertyService.get_property_stats(db)


@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(
    property_id: str,
    db: Session = Depends(get_db)
):
    """Get a single property by ID."""
    property_obj = PropertyService.get_property_by_id(db, property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.get("/slug/{slug}", response_model=PropertyResponse)
def get_property_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a single property by slug."""
    property_obj = PropertyService.get_property_by_slug(db, slug)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.post("/", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new property listing (Admin only)."""
    property_obj = PropertyService.create_property(
        db=db, 
        property_data=property_data,
        created_by=current_user.id
    )
    return property_obj.to_dict()


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: str,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update a property listing (Admin only)."""
    property_obj = PropertyService.update_property(db, property_id, property_data)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(
    property_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a property listing (Admin only)."""
    success = PropertyService.delete_property(db, property_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return None


@router.post("/{property_id}/mark-sold", response_model=PropertyResponse)
def mark_property_as_sold(
    property_id: str,
    request: MarkAsSoldRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Mark a property as sold (Admin only)."""
    property_obj = PropertyService.mark_as_sold(
        db, 
        property_id, 
        sold_price=request.sold_price,
        notes=request.notes
    )
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.post("/{property_id}/mark-rented", response_model=PropertyResponse)
def mark_property_as_rented(
    property_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Mark a property as rented (Admin only)."""
    property_obj = PropertyService.mark_as_rented(db, property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.patch("/{property_id}/status", response_model=PropertyResponse)
def change_property_status(
    property_id: str,
    status: PropertyStatus,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Change property status (Admin only)."""
    property_obj = PropertyService.change_status(db, property_id, status)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    return property_obj.to_dict()


@router.post("/{property_id}/upload-image")
def upload_property_image(
    property_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Upload an image for a property (Admin only)."""
    # Check if property exists
    property_obj = PropertyService.get_property_by_id(db, property_id)
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
        )
    
    # Generate unique filename
    file_ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    filepath = os.path.join(settings.UPLOAD_DIR, "properties", filename)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Save file
    with open(filepath, "wb") as f:
        content = file.file.read()
        if len(content) > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Max size: {settings.MAX_FILE_SIZE / 1024 / 1024}MB"
            )
        f.write(content)
    
    # Return file URL
    file_url = f"/uploads/properties/{filename}"
    
    return {"url": file_url, "filename": filename}
