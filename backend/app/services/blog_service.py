import json
import uuid
import re
from datetime import datetime
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostUpdate


class BlogService:
    """Service class for blog post operations."""
    
    @staticmethod
    def generate_slug(title: str) -> str:
        """Generate URL-friendly slug from title."""
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug[:100]
    
    @staticmethod
    def create_post(db: Session, post_data: BlogPostCreate) -> BlogPost:
        """Create a new blog post."""
        # Generate slug if not provided
        slug = post_data.slug or BlogService.generate_slug(post_data.title)
        
        # Check if slug exists
        existing = db.query(BlogPost).filter(BlogPost.slug == slug).first()
        if existing:
            slug = f"{slug}-{str(uuid.uuid4())[:8]}"
        
        db_post = BlogPost(
            id=str(uuid.uuid4()),
            title=post_data.title,
            slug=slug,
            excerpt=post_data.excerpt,
            content=post_data.content,
            cover_image=post_data.cover_image,
            author_name=post_data.author_name,
            author_image=post_data.author_image,
            category=post_data.category,
            tags=json.dumps(post_data.tags) if post_data.tags else "[]",
            read_time=post_data.read_time,
            is_published=post_data.is_published,
            is_featured=post_data.is_featured,
            created_at=datetime.utcnow(),
            published_at=datetime.utcnow() if post_data.is_published else None,
        )
        
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        
        return db_post
    
    @staticmethod
    def get_post_by_id(db: Session, post_id: str) -> Optional[BlogPost]:
        """Get blog post by ID."""
        return db.query(BlogPost).filter(BlogPost.id == post_id).first()
    
    @staticmethod
    def get_post_by_slug(db: Session, slug: str) -> Optional[BlogPost]:
        """Get blog post by slug."""
        return db.query(BlogPost).filter(BlogPost.slug == slug).first()
    
    @staticmethod
    def get_all_posts(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        category: Optional[str] = None,
        only_published: bool = True
    ) -> List[BlogPost]:
        """Get all blog posts."""
        query = db.query(BlogPost)
        
        if only_published:
            query = query.filter(BlogPost.is_published == True)
        
        if category:
            query = query.filter(BlogPost.category == category)
        
        return query.order_by(desc(BlogPost.created_at)).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_featured_posts(db: Session, limit: int = 3) -> List[BlogPost]:
        """Get featured blog posts."""
        return db.query(BlogPost).filter(
            BlogPost.is_featured == True,
            BlogPost.is_published == True
        ).order_by(desc(BlogPost.created_at)).limit(limit).all()
    
    @staticmethod
    def update_post(db: Session, post_id: str, post_data: BlogPostUpdate) -> Optional[BlogPost]:
        """Update a blog post."""
        db_post = BlogService.get_post_by_id(db, post_id)
        if not db_post:
            return None
        
        update_data = post_data.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            if field == "tags" and value is not None:
                setattr(db_post, field, json.dumps(value))
            else:
                setattr(db_post, field, value)
        
        # Set published_at if publishing for the first time
        if "is_published" in update_data and update_data["is_published"] and not db_post.published_at:
            db_post.published_at = datetime.utcnow()
        
        db_post.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_post)
        
        return db_post
    
    @staticmethod
    def delete_post(db: Session, post_id: str) -> bool:
        """Delete a blog post."""
        db_post = BlogService.get_post_by_id(db, post_id)
        if not db_post:
            return False
        
        db.delete(db_post)
        db.commit()
        
        return True
