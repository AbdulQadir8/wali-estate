from django.conf import settings
from rest_framework.exceptions import ValidationError


ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


def validate_image_upload(file_obj) -> None:
    if file_obj.content_type not in ALLOWED_IMAGE_TYPES:
        allowed = ", ".join(sorted(ALLOWED_IMAGE_TYPES))
        raise ValidationError({"detail": f"Invalid file type. Allowed: {allowed}"})
    if file_obj.size > settings.MAX_UPLOAD_SIZE:
        max_mb = settings.MAX_UPLOAD_SIZE / 1024 / 1024
        raise ValidationError({"detail": f"File too large. Max size: {max_mb}MB"})
