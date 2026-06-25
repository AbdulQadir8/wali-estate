"""Root URL configuration."""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.utils import timezone


def root(_request):
    return JsonResponse(
        {
            "name": "MAAN Estate API",
            "version": "1.0.0",
            "admin": "/admin/",
            "api": "/api/v1",
        }
    )


def health_check(_request):
    return JsonResponse({"status": "healthy", "timestamp": timezone.now().isoformat()})


urlpatterns = [
    path("", root),
    path("health", health_check),
    path("admin/", admin.site.urls),
    path("api/v1/", include("api.v1.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
