from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin, UserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.utils.html import format_html

from apps.accounts.models import UserProfile
from apps.core.admin_mixins import badge

User = get_user_model()


admin.site.site_header = "MAAN Estate Admin"
admin.site.site_title = "MAAN Estate Admin"
admin.site.index_title = "Operations Dashboard"


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    extra = 0
    fields = ("phone", "is_admin", "is_agent")


admin.site.unregister(User)


@admin.register(User)
class MaanUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)
    list_display = ("username", "full_name", "email", "role_badges", "is_active", "last_login", "date_joined")
    list_filter = ("is_active", "is_staff", "is_superuser", "groups", "profile__is_admin", "profile__is_agent")
    search_fields = ("username", "email", "first_name", "last_name", "profile__phone")
    ordering = ("-date_joined",)
    list_select_related = ("profile",)
    fieldsets = (
        ("Login", {"fields": ("username", "password")}),
        ("Personal Information", {"fields": ("first_name", "last_name", "email")}),
        ("Access", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Activity", {"fields": ("last_login", "date_joined")}),
    )

    @admin.display(description="Name")
    def full_name(self, obj):
        return obj.get_full_name() or format_html('<span class="admin-muted">Not set</span>')

    @admin.display(description="Roles")
    def role_badges(self, obj):
        labels = []
        profile = getattr(obj, "profile", None)
        if obj.is_superuser:
            labels.append(badge("Superuser", "danger"))
        if obj.is_staff or (profile and profile.is_admin):
            labels.append(badge("Admin", "info"))
        if profile and profile.is_agent:
            labels.append(badge("Agent", "success"))
        if not labels:
            labels.append(badge("User"))
        return format_html(" ".join(str(label) for label in labels))


admin.site.unregister(Group)


@admin.register(Group)
class MaanGroupAdmin(GroupAdmin):
    list_display = ("name", "permission_count")
    search_fields = ("name", "permissions__name", "permissions__codename")
    filter_horizontal = ("permissions",)

    @admin.display(description="Permissions")
    def permission_count(self, obj):
        return obj.permissions.count()


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "email", "phone", "role_badges", "created_at")
    list_filter = ("is_admin", "is_agent")
    search_fields = ("user__username", "user__email", "user__first_name", "user__last_name", "phone")
    autocomplete_fields = ("user",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("User", {"fields": ("user", "phone")}),
        ("Roles", {"fields": ("is_admin", "is_agent")}),
        ("Timestamps", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )

    @admin.display(description="Email")
    def email(self, obj):
        return obj.user.email

    @admin.display(description="Roles")
    def role_badges(self, obj):
        labels = []
        if obj.is_admin:
            labels.append(badge("Admin", "info"))
        if obj.is_agent:
            labels.append(badge("Agent", "success"))
        if not labels:
            labels.append(badge("User"))
        return format_html(" ".join(str(label) for label in labels))
