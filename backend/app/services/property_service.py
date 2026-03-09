import json
import uuid
import re
from datetime import datetime
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, desc, asc, func

from app.models.property import Property, PropertyStatus, PropertyType, PropertyCategory
from app.schemas.property import PropertyCreate, PropertyUpdate, PropertyFilter


class PropertyService:
    """Service class for property operations."""
    
    @staticmethod
    def generate_slug(title: str) -> str:
        """Generate URL-friendly slug from title."""
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug[:100]
    
    @staticmethod
    def create_property(db: Session, property_data: PropertyCreate, created_by: Optional[str] = None) -> Property:
        """Create a new property listing."""
        # Generate slug
        slug = PropertyService.generate_slug(property_data.title)
        
        # Check if slug exists and append number if needed
        existing = db.query(Property).filter(Property.slug == slug).first()
        if existing:
            slug = f"{slug}-{str(uuid.uuid4())[:8]}"
        
        # Create property object
        db_property = Property(
            id=str(uuid.uuid4()),
            title=property_data.title,
            description=property_data.description,
            price=property_data.price,
            price_numeric=property_data.price_numeric,
            location=property_data.location,
            address=property_data.address,
            city=property_data.city,
            phase=property_data.phase,
            block=property_data.block,
            property_type=property_data.property_type,
            category=property_data.category,
            status=PropertyStatus.ACTIVE,
            bedrooms=property_data.bedrooms,
            bathrooms=property_data.bathrooms,
            area=property_data.area,
            area_sqft=property_data.area_sqft,
            is_featured=property_data.is_featured,
            is_hot=property_data.is_hot,
            is_new=property_data.is_new,
            images=json.dumps(property_data.images) if property_data.images else "[]",
            main_image=property_data.main_image or (property_data.images[0] if property_data.images else None),
            features=json.dumps(property_data.features) if property_data.features else "[]",
            agent_id=property_data.agent_id,
            created_by=created_by,
            slug=slug,
            created_at=datetime.utcnow(),
            listed_at=datetime.utcnow(),
        )
        
        db.add(db_property)
        db.commit()
        db.refresh(db_property)
        
        return db_property
    
    @staticmethod
    def get_property_by_id(db: Session, property_id: str) -> Optional[Property]:
        """Get property by ID."""
        return db.query(Property).filter(Property.id == property_id).first()
    
    @staticmethod
    def get_property_by_slug(db: Session, slug: str) -> Optional[Property]:
        """Get property by slug."""
        return db.query(Property).filter(Property.slug == slug).first()
    
    @staticmethod
    def get_properties(
        db: Session, 
        filters: PropertyFilter
    ) -> Tuple[List[Property], int]:
        """Get properties with filtering and pagination."""
        query = db.query(Property)
        
        # Apply filters
        if filters.search:
            search_term = f"%{filters.search}%"
            query = query.filter(
                or_(
                    Property.title.ilike(search_term),
                    Property.location.ilike(search_term),
                    Property.description.ilike(search_term),
                )
            )
        
        if filters.property_type:
            query = query.filter(Property.property_type == filters.property_type)
        
        if filters.category:
            query = query.filter(Property.category == filters.category)
        
        if filters.status:
            query = query.filter(Property.status == filters.status)
        
        if filters.location:
            query = query.filter(Property.location.ilike(f"%{filters.location}%"))
        
        if filters.phase:
            query = query.filter(Property.phase.ilike(f"%{filters.phase}%"))
        
        if filters.min_price is not None:
            query = query.filter(Property.price_numeric >= filters.min_price)
        
        if filters.max_price is not None:
            query = query.filter(Property.price_numeric <= filters.max_price)
        
        if filters.bedrooms is not None:
            query = query.filter(Property.bedrooms >= filters.bedrooms)
        
        if filters.is_hot is not None:
            query = query.filter(Property.is_hot == filters.is_hot)
        
        if filters.is_new is not None:
            query = query.filter(Property.is_new == filters.is_new)
        
        if filters.is_featured is not None:
            query = query.filter(Property.is_featured == filters.is_featured)
        
        if filters.agent_id:
            query = query.filter(Property.agent_id == filters.agent_id)
        
        # Get total count
        total = query.count()
        
        # Apply sorting
        sort_column = getattr(Property, filters.sort_by, Property.created_at)
        if filters.sort_order.lower() == "desc":
            query = query.order_by(desc(sort_column))
        else:
            query = query.order_by(asc(sort_column))
        
        # Apply pagination
        offset = (filters.page - 1) * filters.page_size
        query = query.offset(offset).limit(filters.page_size)
        
        return query.all(), total
    
    @staticmethod
    def update_property(
        db: Session, 
        property_id: str, 
        property_data: PropertyUpdate
    ) -> Optional[Property]:
        """Update a property."""
        db_property = PropertyService.get_property_by_id(db, property_id)
        if not db_property:
            return None
        
        # Update fields
        update_data = property_data.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            if field == "images" and value is not None:
                setattr(db_property, field, json.dumps(value))
            elif field == "features" and value is not None:
                setattr(db_property, field, json.dumps(value))
            else:
                setattr(db_property, field, value)
        
        # Update main_image if images changed
        if "images" in update_data and update_data["images"]:
            db_property.main_image = update_data["images"][0]
        
        db_property.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_property)
        
        return db_property
    
    @staticmethod
    def delete_property(db: Session, property_id: str) -> bool:
        """Delete a property (hard delete)."""
        db_property = PropertyService.get_property_by_id(db, property_id)
        if not db_property:
            return False
        
        db.delete(db_property)
        db.commit()
        
        return True
    
    @staticmethod
    def mark_as_sold(
        db: Session, 
        property_id: str, 
        sold_price: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Optional[Property]:
        """Mark a property as sold."""
        db_property = PropertyService.get_property_by_id(db, property_id)
        if not db_property:
            return None
        
        db_property.status = PropertyStatus.SOLD
        if sold_price:
            db_property.price = sold_price
        db_property.sold_at = datetime.utcnow()
        db_property.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_property)
        
        return db_property
    
    @staticmethod
    def mark_as_rented(
        db: Session, 
        property_id: str
    ) -> Optional[Property]:
        """Mark a property as rented."""
        db_property = PropertyService.get_property_by_id(db, property_id)
        if not db_property:
            return None
        
        db_property.status = PropertyStatus.RENTED
        db_property.sold_at = datetime.utcnow()
        db_property.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_property)
        
        return db_property
    
    @staticmethod
    def change_status(
        db: Session, 
        property_id: str, 
        status: PropertyStatus
    ) -> Optional[Property]:
        """Change property status."""
        db_property = PropertyService.get_property_by_id(db, property_id)
        if not db_property:
            return None
        
        db_property.status = status
        
        # If marking as sold/rented, set sold_at
        if status in [PropertyStatus.SOLD, PropertyStatus.RENTED] and not db_property.sold_at:
            db_property.sold_at = datetime.utcnow()
        
        db_property.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_property)
        
        return db_property
    
    @staticmethod
    def get_featured_properties(db: Session, limit: int = 6) -> List[Property]:
        """Get featured properties."""
        return db.query(Property).filter(
            and_(
                Property.is_featured == True,
                Property.status == PropertyStatus.ACTIVE
            )
        ).order_by(desc(Property.created_at)).limit(limit).all()
    
    @staticmethod
    def get_hot_properties(db: Session, limit: int = 6) -> List[Property]:
        """Get hot properties."""
        return db.query(Property).filter(
            and_(
                Property.is_hot == True,
                Property.status == PropertyStatus.ACTIVE
            )
        ).order_by(desc(Property.created_at)).limit(limit).all()
    
    @staticmethod
    def get_new_properties(db: Session, limit: int = 6) -> List[Property]:
        """Get new properties."""
        return db.query(Property).filter(
            and_(
                Property.is_new == True,
                Property.status == PropertyStatus.ACTIVE
            )
        ).order_by(desc(Property.created_at)).limit(limit).all()
    
    @staticmethod
    def get_property_stats(db: Session) -> dict:
        """Get property statistics."""
        total = db.query(Property).count()
        active = db.query(Property).filter(Property.status == PropertyStatus.ACTIVE).count()
        sold = db.query(Property).filter(Property.status == PropertyStatus.SOLD).count()
        rented = db.query(Property).filter(Property.status == PropertyStatus.RENTED).count()
        pending = db.query(Property).filter(Property.status == PropertyStatus.PENDING).count()
        
        return {
            "total": total,
            "active": active,
            "sold": sold,
            "rented": rented,
            "pending": pending,
        }
