from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Mission, UserMission, Badge, UserBadge
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['pseudo'] = user.profile.pseudo
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'pseudo', 'solde', 'score', 'created_at')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ('id', 'name', 'description', 'icon')

class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)

    class Meta:
        model = UserBadge
        fields = ('id', 'badge', 'acquired_at')

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = ('id', 'title', 'description', 'category', 'difficulty', 'reward', 'duration_minutes', 'created_at', 'is_active')

class UserMissionSerializer(serializers.ModelSerializer):
    mission = MissionSerializer(read_only=True)
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserMission
        fields = ('id', 'user', 'mission', 'status', 'started_at', 'completed_at')

class CompleteMissionSerializer(serializers.Serializer):
    mission_id = serializers.IntegerField()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    pseudo = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'pseudo')
    
    def create(self, validated_data):
        pseudo = validated_data.pop('pseudo')        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        user.profile.pseudo = pseudo
        user.profile.save()
        return user