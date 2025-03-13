from rest_framework import serializers

class DiseasePredictionSerializer(serializers.Serializer):
    symptoms = serializers.CharField(required=True)