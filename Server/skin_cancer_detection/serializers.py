from rest_framework import serializers

class SkinCancerDetectionSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)