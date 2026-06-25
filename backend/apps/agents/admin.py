from django.contrib import admin
from django.utils.html import format_html

from apps.agents.models import Agent
from apps.core.admin_mixins import PrettyJSONAdminMixin, list_summary


@admin.register(Agent)
class AgentAdmin(PrettyJSONAdminMixin, admin.ModelAdmin):
    list_display = ("image_preview", "name", "title", "email", "phone", "specialties_preview", "property_count", "created_at")
    search_fields = ("name", "title", "email", "phone")
    list_filter = ("created_at", "experience_years")
    readonly_fields = ("created_at", "updated_at", "property_count")
    ordering = ("name",)
    fieldsets = (
        ("Profile", {"fields": ("name", "title", "bio", "image")}),
        ("Contact", {"fields": ("email", "phone")}),
        ("Expertise", {"fields": ("experience_years", "specialties", "listings_count", "property_count")}),
        ("Social Links", {"fields": ("facebook", "twitter", "linkedin"), "classes": ("collapse",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )

    @admin.display(description="Specialties")
    def specialties_preview(self, obj):
        return list_summary(obj.specialties)

    @admin.display(description="Properties")
    def property_count(self, obj):
        count = obj.properties.count() if obj.pk else 0
        return format_html('<strong>{}</strong>', count)
