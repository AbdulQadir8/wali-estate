import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone


class PropertyType(models.TextChoices):
    SALE = "sale", "Sale"
    RENT = "rent", "Rent"


class PropertyCategory(models.TextChoices):
    RESIDENTIAL_PLOT = "Residential Plots", "Residential Plots"
    COMMERCIAL_PLOT = "Commercial Plots", "Commercial Plots"
    HOUSE = "Houses", "Houses"
    APARTMENT = "Apartments", "Apartments"
    VILLA = "Villas", "Villas"
    FILE = "Files", "Files"


class PropertyStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    SOLD = "sold", "Sold"
    RENTED = "rented", "Rented"
    PENDING = "pending", "Pending"
    INACTIVE = "inactive", "Inactive"


class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200, db_index=True)
    description = models.TextField(blank=True)
    price = models.CharField(max_length=100)
    price_numeric = models.FloatField(null=True, blank=True)
    location = models.CharField(max_length=200, db_index=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, default="Lahore")
    phase = models.CharField(max_length=100, blank=True, db_index=True)
    block = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=10, choices=PropertyType.choices, default=PropertyType.SALE)
    category = models.CharField(
        max_length=50,
        choices=PropertyCategory.choices,
        default=PropertyCategory.RESIDENTIAL_PLOT,
    )
    status = models.CharField(max_length=20, choices=PropertyStatus.choices, default=PropertyStatus.ACTIVE, db_index=True)
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    area = models.CharField(max_length=100, blank=True)
    area_sqft = models.FloatField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_hot = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    images = models.JSONField(default=list, blank=True)
    main_image = models.CharField(max_length=500, blank=True)
    features = models.JSONField(default=list, blank=True)
    agent = models.ForeignKey("agents.Agent", on_delete=models.SET_NULL, null=True, blank=True, related_name="properties")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="properties")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    listed_at = models.DateTimeField(default=timezone.now)
    sold_at = models.DateTimeField(null=True, blank=True)
    slug = models.SlugField(max_length=120, unique=True, null=True, blank=True)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title
