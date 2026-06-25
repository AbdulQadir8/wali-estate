from pathlib import Path
from uuid import uuid4

from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.blog.models import BlogPost
from apps.blog.serializers import BlogPostSerializer
from apps.core.permissions import IsAdminUserFlag
from apps.core.uploads import validate_image_upload


class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        if self.request.query_params.get("only_published", "true").lower() != "false":
            queryset = queryset.filter(is_published=True)
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset

    def get_permissions(self):
        if self.action in {"list", "retrieve", "featured", "by_slug"}:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdminUserFlag()]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if "page" not in request.query_params and "page_size" not in request.query_params:
            return Response(BlogPostSerializer(queryset, many=True).data)

        page_number = max(int(request.query_params.get("page", 1)), 1)
        page_size = min(max(int(request.query_params.get("page_size", 10)), 1), 100)
        total = queryset.count()
        start = (page_number - 1) * page_size
        items = queryset[start : start + page_size]
        pages = (total + page_size - 1) // page_size
        return Response(
            {
                "items": BlogPostSerializer(items, many=True).data,
                "total": total,
                "page": page_number,
                "page_size": page_size,
                "pages": pages,
            }
        )

    @action(detail=False, methods=["get"])
    def featured(self, request):
        limit = int(request.query_params.get("limit", 3))
        posts = self.get_queryset().filter(is_featured=True)[:limit]
        return Response(BlogPostSerializer(posts, many=True).data)

    @action(detail=False, methods=["get"], url_path=r"slug/(?P<slug>[-\w]+)")
    def by_slug(self, request, slug=None):
        post = self.get_queryset().filter(slug=slug).first()
        if not post:
            return Response({"detail": "Blog post not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(BlogPostSerializer(post).data)

    @action(detail=True, methods=["post"], url_path="upload-image")
    def upload_image(self, request, pk=None):
        post = self.get_object()
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"detail": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        validate_image_upload(file_obj)
        ext = Path(file_obj.name).suffix or ".jpg"
        path = default_storage.save(f"blog/{uuid4()}{ext}", file_obj)
        post.cover_image = f"{settings.MEDIA_URL}{path}"
        post.save(update_fields=["cover_image", "updated_at"])
        return Response({"url": post.cover_image, "filename": Path(path).name})
