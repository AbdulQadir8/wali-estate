import uuid

from django.db import models


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(max_length=255, unique=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    cover_image = models.CharField(max_length=500, blank=True)
    author_name = models.CharField(max_length=200)
    author_image = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100, default="General")
    tags = models.JSONField(default=list, blank=True)
    read_time = models.CharField(max_length=50, default="5 min read")
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title
