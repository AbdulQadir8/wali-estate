from pathlib import Path
from uuid import uuid4

from django.conf import settings
from django.core.files.storage import default_storage
from django.db.models import Count, Q
from django.utils import timezone
from django.utils.text import slugify
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.core.permissions import IsAdminUserFlag
from apps.core.uploads import validate_image_upload
from apps.properties.models import Property, PropertyStatus
from apps.properties.serializers import PropertySerializer, PropertyWriteSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.select_related("agent", "created_by").all()

    def get_serializer_class(self):
        if self.action in {"create", "update", "partial_update"}:
            return PropertyWriteSerializer
        return PropertySerializer

    def get_permissions(self):
        if self.action in {"list", "retrieve", "featured", "hot", "new", "stats", "by_slug"}:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdminUserFlag()]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params

        search = params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                | Q(location__icontains=search)
                | Q(description__icontains=search)
            )

        exact_filters = {
            "property_type": "property_type",
            "category": "category",
            "status": "status",
            "is_hot": "is_hot",
            "is_new": "is_new",
            "is_featured": "is_featured",
            "agent_id": "agent_id",
        }
        for param, field in exact_filters.items():
            value = params.get(param)
            if value not in (None, ""):
                if value.lower() in {"true", "false"}:
                    value = value.lower() == "true"
                queryset = queryset.filter(**{field: value})

        for param, field in {"location": "location__icontains", "phase": "phase__icontains"}.items():
            value = params.get(param)
            if value:
                queryset = queryset.filter(**{field: value})

        if params.get("min_price"):
            queryset = queryset.filter(price_numeric__gte=params["min_price"])
        if params.get("max_price"):
            queryset = queryset.filter(price_numeric__lte=params["max_price"])
        if params.get("bedrooms"):
            queryset = queryset.filter(bedrooms__gte=params["bedrooms"])

        sort_by = params.get("sort_by", "created_at")
        sort_order = params.get("sort_order", "desc")
        allowed_sort_fields = {
            "created_at",
            "updated_at",
            "listed_at",
            "price_numeric",
            "title",
            "location",
            "bedrooms",
        }
        if sort_by not in allowed_sort_fields:
            sort_by = "created_at"
        if sort_order.lower() == "desc":
            sort_by = f"-{sort_by}"
        return queryset.order_by(sort_by)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page_number = max(int(request.query_params.get("page", 1)), 1)
        page_size = min(max(int(request.query_params.get("page_size", 10)), 1), 100)
        total = queryset.count()
        start = (page_number - 1) * page_size
        items = queryset[start : start + page_size]
        pages = (total + page_size - 1) // page_size
        return Response(
            {
                "items": PropertySerializer(items, many=True).data,
                "total": total,
                "page": page_number,
                "page_size": page_size,
                "pages": pages,
            }
        )

    def perform_create(self, serializer):
        title = serializer.validated_data["title"]
        base_slug = slugify(title)[:100] or str(uuid4())[:8]
        slug = base_slug
        counter = 1
        while Property.objects.filter(slug=slug).exists():
            counter += 1
            slug = f"{base_slug}-{counter}"
        serializer.save(created_by=self.request.user, slug=slug)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        property_obj = serializer.save(created_by=request.user)
        if not property_obj.slug:
            property_obj.slug = self._unique_slug(property_obj.title)
            property_obj.save(update_fields=["slug"])
        return Response(PropertySerializer(property_obj).data, status=status.HTTP_201_CREATED)

    def _unique_slug(self, title: str) -> str:
        base_slug = slugify(title)[:100] or str(uuid4())[:8]
        slug = base_slug
        counter = 1
        while Property.objects.filter(slug=slug).exists():
            counter += 1
            slug = f"{base_slug}-{counter}"
        return slug

    @action(detail=False, methods=["get"])
    def featured(self, request):
        limit = int(request.query_params.get("limit", 6))
        queryset = self.get_queryset().filter(is_featured=True)[:limit]
        return Response(PropertySerializer(queryset, many=True).data)

    @action(detail=False, methods=["get"])
    def hot(self, request):
        limit = int(request.query_params.get("limit", 6))
        queryset = self.get_queryset().filter(is_hot=True)[:limit]
        return Response(PropertySerializer(queryset, many=True).data)

    @action(detail=False, methods=["get"], url_path="new")
    def new(self, request):
        limit = int(request.query_params.get("limit", 6))
        queryset = self.get_queryset().filter(is_new=True)[:limit]
        return Response(PropertySerializer(queryset, many=True).data)

    @action(detail=False, methods=["get"])
    def stats(self, request):
        base = Property.objects.all()
        by_status = dict(base.values_list("status").annotate(total=Count("id")))
        return Response(
            {
                "total": base.count(),
                "active": by_status.get(PropertyStatus.ACTIVE, 0),
                "sold": by_status.get(PropertyStatus.SOLD, 0),
                "rented": by_status.get(PropertyStatus.RENTED, 0),
                "featured": base.filter(is_featured=True).count(),
                "hot": base.filter(is_hot=True).count(),
                "new": base.filter(is_new=True).count(),
            }
        )

    @action(detail=False, methods=["get"], url_path=r"slug/(?P<slug>[-\w]+)")
    def by_slug(self, request, slug=None):
        property_obj = self.get_queryset().filter(slug=slug).first()
        if not property_obj:
            return Response({"detail": "Property not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(PropertySerializer(property_obj).data)

    @action(detail=True, methods=["post"], url_path="mark-sold")
    def mark_sold(self, request, pk=None):
        property_obj = self.get_object()
        property_obj.status = PropertyStatus.SOLD
        if request.data.get("sold_price"):
            property_obj.price = request.data["sold_price"]
        property_obj.sold_at = timezone.now()
        property_obj.save(update_fields=["status", "price", "sold_at", "updated_at"])
        return Response(PropertySerializer(property_obj).data)

    @action(detail=True, methods=["post"], url_path="mark-rented")
    def mark_rented(self, request, pk=None):
        property_obj = self.get_object()
        property_obj.status = PropertyStatus.RENTED
        property_obj.sold_at = timezone.now()
        property_obj.save(update_fields=["status", "sold_at", "updated_at"])
        return Response(PropertySerializer(property_obj).data)

    @action(detail=True, methods=["patch"])
    def status(self, request, pk=None):
        property_obj = self.get_object()
        new_status = request.data.get("status") or request.query_params.get("status")
        if new_status not in PropertyStatus.values:
            return Response({"detail": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        property_obj.status = new_status
        if new_status in {PropertyStatus.SOLD, PropertyStatus.RENTED} and not property_obj.sold_at:
            property_obj.sold_at = timezone.now()
        property_obj.save(update_fields=["status", "sold_at", "updated_at"])
        return Response(PropertySerializer(property_obj).data)

    @action(detail=True, methods=["post"], url_path="upload-image")
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"detail": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        validate_image_upload(file_obj)
        ext = Path(file_obj.name).suffix or ".jpg"
        path = default_storage.save(f"properties/{uuid4()}{ext}", file_obj)
        url = f"{settings.MEDIA_URL}{path}"
        images = list(property_obj.images or [])
        images.append(url)
        property_obj.images = images
        property_obj.main_image = property_obj.main_image or url
        property_obj.save(update_fields=["images", "main_image", "updated_at"])
        return Response({"url": url, "filename": Path(path).name})
