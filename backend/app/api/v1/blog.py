from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.orm import Session
import os
import uuid

from app.api.deps import get_db, get_current_active_user, get_current_admin_user
from app.schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from app.services.blog_service import BlogService
from app.models.user import User
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=List[BlogPostResponse])
def list_posts(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = Query(None),
    only_published: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Get all blog posts."""
    posts = BlogService.get_all_posts(
        db, 
        skip=skip, 
        limit=limit,
        category=category,
        only_published=only_published
    )
    return [post.to_dict() for post in posts]


@router.get("/featured", response_model=List[BlogPostResponse])
def get_featured_posts(
    limit: int = Query(3, ge=1, le=10),
    db: Session = Depends(get_db)
):
    """Get featured blog posts."""
    posts = BlogService.get_featured_posts(db, limit)
    return [post.to_dict() for post in posts]


@router.get("/{post_id}", response_model=BlogPostResponse)
def get_post(
    post_id: str,
    db: Session = Depends(get_db)
):
    """Get a single blog post by ID."""
    post = BlogService.get_post_by_id(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return post.to_dict()


@router.get("/slug/{slug}", response_model=BlogPostResponse)
def get_post_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a single blog post by slug."""
    post = BlogService.get_post_by_slug(db, slug)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return post.to_dict()


@router.post("/", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def create_post(
    post_data: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new blog post (Admin only)."""
    post = BlogService.create_post(db, post_data)
    return post.to_dict()


@router.put("/{post_id}", response_model=BlogPostResponse)
def update_post(
    post_id: str,
    post_data: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update a blog post (Admin only)."""
    post = BlogService.update_post(db, post_id, post_data)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return post.to_dict()


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a blog post (Admin only)."""
    success = BlogService.delete_post(db, post_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    return None


@router.post("/{post_id}/upload-image")
def upload_post_image(
    post_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Upload a cover image for a blog post (Admin only)."""
    # Check if post exists
    post = BlogService.get_post_by_id(db, post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
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
    filepath = os.path.join(settings.UPLOAD_DIR, "blog", filename)
    
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
    file_url = f"/uploads/blog/{filename}"
    
    return {"url": file_url, "filename": filename}
