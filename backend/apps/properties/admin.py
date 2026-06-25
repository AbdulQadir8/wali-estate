from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html

from apps.core.admin_mixins import PrettyJSONAdminMixin, badge, list_summary
from apps.properties.models import Property, PropertyStatus


@admin.register(Property)
class PropertyAdmin(PrettyJSONAdminMixin, admin.ModelAdmin):
    list_display = (
        "image_preview",
        "title",
        "price",
        "location",
        "status_badge",
        "property_type",
        "category",
        "flags",
        "agent",
        "updated_at",
    )
    list_filter = ("property_type", "category", "status", "is_featured", "is_hot", "is_new", "city", "phase")
    search_fields = ("title", "description", "location", "phase", "block")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("agent", "created_by")
    readonly_fields = ("created_at", "updated_at", "listed_at", "sold_at", "features_preview")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    actions = ("mark_active", "mark_sold", "mark_rented", "mark_featured", "mark_hot", "mark_new")
    fieldsets = (
        ("Listing", {"fields": ("title", "slug", "description", "status")}),
        ("Pricing", {"fields": ("price", "price_numeric")}),
        ("Location", {"fields": ("location", "address", "city", "phase", "block")}),
        ("Details", {"fields": ("property_type", "category", "bedrooms", "bathrooms", "area", "area_sqft")}),
        ("Visibility", {"fields": ("is_featured", "is_hot", "is_new")}),
        ("Media And Features", {"fields": ("main_image", "images", "features", "features_preview")}),
        ("Team", {"fields": ("agent", "created_by")}),
        ("SEO", {"fields": ("meta_title", "meta_description"), "classes": ("collapse",)}),
        ("Timestamps", {"fields": ("listed_at", "sold_at", "created_at", "updated_at"), "classes": ("collapse",)}),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        tones = {
            PropertyStatus.ACTIVE: "success",
            PropertyStatus.SOLD: "danger",
            PropertyStatus.RENTED: "info",
            PropertyStatus.PENDING: "warning",
            PropertyStatus.INACTIVE: "neutral",
        }
        return badge(obj.get_status_display(), tones.get(obj.status, "neutral"))

    @admin.display(description="Flags")
    def flags(self, obj):
        labels = []
        if obj.is_featured:
            labels.append(badge("Featured", "info"))
        if obj.is_hot:
            labels.append(badge("Hot", "warning"))
        if obj.is_new:
            labels.append(badge("New", "success"))
        return format_html(" ".join(str(label) for label in labels)) if labels else badge("Standard")

    @admin.display(description="Features")
    def features_preview(self, obj):
        return list_summary(obj.features)

    @admin.action(description="Mark selected listings active")
    def mark_active(self, request, queryset):
        queryset.update(status=PropertyStatus.ACTIVE, sold_at=None)

    @admin.action(description="Mark selected listings sold")
    def mark_sold(self, request, queryset):
        queryset.update(status=PropertyStatus.SOLD, sold_at=timezone.now())

    @admin.action(description="Mark selected listings rented")
    def mark_rented(self, request, queryset):
        queryset.update(status=PropertyStatus.RENTED, sold_at=timezone.now())

    @admin.action(description="Mark selected listings featured")
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description="Mark selected listings hot")
    def mark_hot(self, request, queryset):
        queryset.update(is_hot=True)

    @admin.action(description="Mark selected listings new")
    def mark_new(self, request, queryset):
        queryset.update(is_new=True)
