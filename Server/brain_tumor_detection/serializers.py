from rest_framework import serializers

class BrainTumorDetectionSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)