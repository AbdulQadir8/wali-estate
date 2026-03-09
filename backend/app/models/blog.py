import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Boolean
from app.db.database import Base


class BlogPost(Base):
    """Blog post model."""
    __tablename__ = "blog_posts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    
    # Media
    cover_image = Column(String, nullable=True)
    
    # Author
    author_name = Column(String, nullable=False)
    author_image = Column(String, nullable=True)
    
    # Metadata
    category = Column(String, default="General")
    tags = Column(Text, default="[]")  # JSON array
    read_time = Column(String, default="5 min read")
    
    # Status
    is_published = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime, nullable=True)
    
    # SEO
    meta_title = Column(String, nullable=True)
    meta_description = Column(Text, nullable=True)
    
    def __repr__(self):
        return f"<BlogPost {self.title}>"
    
    def to_dict(self):
        """Convert blog post to dictionary."""
        import json
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "excerpt": self.excerpt,
            "content": self.content,
            "cover_image": self.cover_image,
            "author_name": self.author_name,
            "author_image": self.author_image,
            "category": self.category,
            "tags": json.loads(self.tags) if self.tags else [],
            "read_time": self.read_time,
            "is_published": self.is_published,
            "is_featured": self.is_featured,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "published_at": self.published_at.isoformat() if self.published_at else None,
        }
