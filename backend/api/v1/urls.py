from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.accounts.views import CurrentUserView, LoginView, RegisterView, UserViewSet
from apps.agents.views import AgentViewSet
from apps.blog.views import BlogPostViewSet
from apps.properties.views import PropertyViewSet

router = DefaultRouter()
router.trailing_slash = "/?"
router.register("properties", PropertyViewSet, basename="properties")
router.register("agents", AgentViewSet, basename="agents")
router.register("blog", BlogPostViewSet, basename="blog")
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("auth/login", LoginView.as_view(), name="auth-login"),
    path("auth/register", RegisterView.as_view(), name="auth-register"),
    path("auth/me", CurrentUserView.as_view(), name="auth-me"),
    path("", include(router.urls)),
]
