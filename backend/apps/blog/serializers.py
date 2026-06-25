from rest_framework import serializers

from apps.blog.models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = (
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "cover_image",
            "author_name",
            "author_image",
            "category",
            "tags",
            "read_time",
            "is_published",
            "is_featured",
            "created_at",
            "updated_at",
            "published_at",
            "meta_title",
            "meta_description",
        )
        read_only_fields = ("id", "created_at", "updated_at")
