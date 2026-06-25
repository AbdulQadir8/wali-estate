from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

from apps.accounts.models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    full_name = serializers.CharField(source="get_full_name")
    phone = serializers.CharField(source="profile.phone", allow_blank=True, required=False)
    is_admin = serializers.BooleanField(source="profile.is_admin", read_only=True)
    is_agent = serializers.BooleanField(source="profile.is_agent", read_only=True)
    created_at = serializers.DateTimeField(source="date_joined", read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "full_name",
            "phone",
            "is_active",
            "is_admin",
            "is_agent",
            "created_at",
            "last_login",
        )


class UserAdminWriteSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True, required=False, min_length=2, max_length=100)
    phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=False, min_length=8, max_length=100)
    is_admin = serializers.BooleanField(write_only=True, required=False)
    is_agent = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "password",
            "full_name",
            "phone",
            "is_active",
            "is_admin",
            "is_agent",
        )

    def create(self, validated_data):
        profile_data = {
            "phone": validated_data.pop("phone", ""),
            "is_admin": validated_data.pop("is_admin", False),
            "is_agent": validated_data.pop("is_agent", False),
        }
        full_name = validated_data.pop("full_name", "")
        password = validated_data.pop("password")
        first_name, _, last_name = full_name.partition(" ")
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            password=password,
            **validated_data,
        )
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = {
            key: validated_data.pop(key)
            for key in ("phone", "is_admin", "is_agent")
            if key in validated_data
        }
        if "full_name" in validated_data:
            full_name = validated_data.pop("full_name")
            instance.first_name, _, instance.last_name = full_name.partition(" ")
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        profile, _ = UserProfile.objects.get_or_create(user=instance)
        for key, value in profile_data.items():
            setattr(profile, key, value)
        profile.save()
        return instance


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(min_length=3, max_length=50)
    password = serializers.CharField(min_length=8, max_length=100, write_only=True)
    full_name = serializers.CharField(min_length=2, max_length=100)
    phone = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value: str) -> str:
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already registered")
        return value

    def validate_email(self, value: str) -> str:
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        full_name = validated_data.pop("full_name")
        phone = validated_data.pop("phone", "")
        first_name, _, last_name = full_name.partition(" ")
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            **validated_data,
        )
        UserProfile.objects.create(user=user, phone=phone)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["username"], password=attrs["password"])
        if not user:
            raise serializers.ValidationError("Incorrect username or password")
        if not user.is_active:
            raise serializers.ValidationError("Inactive user")
        attrs["user"] = user
        return attrs
