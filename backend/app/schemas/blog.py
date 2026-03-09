from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class BlogPostBase(BaseModel):
    """Base blog post schema."""
    title: str = Field(..., min_length=5, max_length=200)
    excerpt: Optional[str] = None
    content: str = Field(..., min_length=10)
    category: str = "General"
    tags: List[str] = []
    read_time: str = "5 min read"
    is_featured: bool = False


class BlogPostCreate(BlogPostBase):
    """Blog post creation schema."""
    slug: str = Field(..., min_length=3, max_length=200)
    cover_image: Optional[str] = None
    author_name: str = "MAAN Estate"
    author_image: Optional[str] = None
    is_published: bool = True


class BlogPostUpdate(BaseModel):
    """Blog post update schema."""
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    excerpt: Optional[str] = None
    content: Optional[str] = Field(None, min_length=10)
    slug: Optional[str] = Field(None, min_length=3, max_length=200)
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None


class BlogPostResponse(BlogPostBase):
    """Blog post response schema."""
    id: str
    slug: str
    cover_image: Optional[str]
    author_name: str
    author_image: Optional[str]
    is_published: bool
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime]
    
    class Config:
        from_attributes = True
