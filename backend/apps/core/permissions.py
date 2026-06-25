from rest_framework.permissions import BasePermission


class IsAdminUserFlag(BasePermission):
    """Allow Django staff/superusers and migrated users marked as admin."""

    def has_permission(self, request, view) -> bool:
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and (user.is_staff or user.is_superuser or getattr(user, "profile", None) and user.profile.is_admin)
        )
