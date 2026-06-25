from django.contrib import admin
from django.utils import timezone

from apps.blog.models import BlogPost
from apps.core.admin_mixins import PrettyJSONAdminMixin, badge, list_summary


@admin.register(BlogPost)
class BlogPostAdmin(PrettyJSONAdminMixin, admin.ModelAdmin):
    list_display = ("image_preview", "title", "category", "status_badge", "featured_badge", "tags_preview", "published_at", "updated_at")
    list_filter = ("is_published", "is_featured", "category", "created_at", "published_at")
    search_fields = ("title", "excerpt", "content", "author_name")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    date_hierarchy = "created_at"
    actions = ("publish_posts", "unpublish_posts", "mark_featured", "remove_featured")
    fieldsets = (
        ("Content", {"fields": ("title", "slug", "excerpt", "content")}),
        ("Media", {"fields": ("cover_image",)}),
        ("Author", {"fields": ("author_name", "author_image")}),
        ("Organization", {"fields": ("category", "tags", "read_time")}),
        ("Publishing", {"fields": ("is_published", "is_featured", "published_at")}),
        ("SEO", {"fields": ("meta_title", "meta_description"), "classes": ("collapse",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        return badge("Published", "success") if obj.is_published else badge("Draft", "warning")

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        return badge("Featured", "info") if obj.is_featured else badge("Standard")

    @admin.display(description="Tags")
    def tags_preview(self, obj):
        return list_summary(obj.tags)

    @admin.action(description="Publish selected posts")
    def publish_posts(self, request, queryset):
        queryset.update(is_published=True, published_at=timezone.now())

    @admin.action(description="Unpublish selected posts")
    def unpublish_posts(self, request, queryset):
        queryset.update(is_published=False)

    @admin.action(description="Mark selected posts as featured")
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description="Remove selected posts from featured")
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
