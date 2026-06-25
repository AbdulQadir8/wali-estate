from pathlib import Path
from uuid import uuid4

from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.agents.models import Agent
from apps.agents.serializers import AgentSerializer
from apps.core.permissions import IsAdminUserFlag
from apps.core.uploads import validate_image_upload


class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

    def get_permissions(self):
        if self.action in {"list", "retrieve"}:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsAdminUserFlag()]

    @action(detail=True, methods=["post"], url_path="upload-image")
    def upload_image(self, request, pk=None):
        agent = self.get_object()
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"detail": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        validate_image_upload(file_obj)
        ext = Path(file_obj.name).suffix or ".jpg"
        path = default_storage.save(f"agents/{uuid4()}{ext}", file_obj)
        agent.image = f"{settings.MEDIA_URL}{path}"
        agent.save(update_fields=["image", "updated_at"])
        return Response({"url": agent.image, "filename": Path(path).name})
