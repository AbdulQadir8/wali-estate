from rest_framework import serializers

from apps.agents.models import Agent


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = (
            "id",
            "name",
            "title",
            "email",
            "phone",
            "bio",
            "image",
            "listings_count",
            "experience_years",
            "specialties",
            "facebook",
            "twitter",
            "linkedin",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
