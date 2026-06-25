import json

from django.contrib import admin
from django.db import models
from django.forms import Textarea
from django.utils.html import format_html


class PrettyJSONAdminMixin:
    formfield_overrides = {
        models.JSONField: {
            "widget": Textarea(
                attrs={
                    "rows": 4,
                    "class": "vLargeTextField json-field",
                    "placeholder": 'Example: ["Prime Location", "Corner Plot"]',
                }
            )
        }
    }

    @admin.display(description="Preview")
    def image_preview(self, obj):
        image = getattr(obj, "main_image", "") or getattr(obj, "image", "") or getattr(obj, "cover_image", "")
        if not image:
            return format_html('<span class="admin-muted">No image</span>')
        return format_html(
            '<a href="{}" target="_blank" rel="noopener">'
            '<img src="{}" class="admin-thumb" alt="" />'
            "</a>",
            image,
            image,
        )


def list_summary(value, empty="None"):
    if not value:
        return format_html('<span class="admin-muted">{}</span>', empty)
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            return value
    return ", ".join(str(item) for item in value[:4])


def badge(label, tone="neutral"):
    return format_html('<span class="admin-badge admin-badge-{}">{}</span>', tone, label)
