from rest_framework import serializers

from apps.properties.models import Property


class PropertySerializer(serializers.ModelSerializer):
    agent_id = serializers.UUIDField(source="agent.id", read_only=True)

    class Meta:
        model = Property
        fields = (
            "id",
            "title",
            "description",
            "price",
            "price_numeric",
            "location",
            "address",
            "city",
            "phase",
            "block",
            "property_type",
            "category",
            "status",
            "bedrooms",
            "bathrooms",
            "area",
            "area_sqft",
            "is_featured",
            "is_hot",
            "is_new",
            "images",
            "main_image",
            "features",
            "agent_id",
            "slug",
            "created_at",
            "updated_at",
            "listed_at",
            "sold_at",
        )
        read_only_fields = ("id", "slug", "created_at", "updated_at", "listed_at", "sold_at")


class PropertyWriteSerializer(serializers.ModelSerializer):
    agent_id = serializers.UUIDField(required=False, allow_null=True, write_only=True)

    class Meta:
        model = Property
        fields = (
            "title",
            "description",
            "price",
            "price_numeric",
            "location",
            "address",
            "city",
            "phase",
            "block",
            "property_type",
            "category",
            "status",
            "bedrooms",
            "bathrooms",
            "area",
            "area_sqft",
            "is_featured",
            "is_hot",
            "is_new",
            "images",
            "main_image",
            "features",
            "agent_id",
            "meta_title",
            "meta_description",
        )

    def create(self, validated_data):
        agent_id = validated_data.pop("agent_id", None)
        if agent_id:
            validated_data["agent_id"] = agent_id
        if not validated_data.get("main_image") and validated_data.get("images"):
            validated_data["main_image"] = validated_data["images"][0]
        return super().create(validated_data)

    def update(self, instance, validated_data):
        agent_id = validated_data.pop("agent_id", None)
        if agent_id is not None:
            validated_data["agent_id"] = agent_id
        if "images" in validated_data and validated_data["images"] and not validated_data.get("main_image"):
            validated_data["main_image"] = validated_data["images"][0]
        return super().update(instance, validated_data)
