import numpy as np
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import BrainTumorDetectionSerializer
from users.models import SearchHistory
from PIL import Image
from django.apps import apps

CLASS_LABELS = ["notumor", "glioma", "meningioma", "pituitary"]
IMAGE_SIZE = 128

class BrainTumorDetectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = BrainTumorDetectionSerializer(data=request.data)
        if serializer.is_valid():
            image_file = serializer.validated_data['image']
        
            try:
                image = Image.open(io.BytesIO(image_file.read()))
                image = image.resize((IMAGE_SIZE, IMAGE_SIZE))
                image = np.array(image) / 255.0
                image = np.expand_dims(image, axis=0)

                model = apps.get_app_config('brain_tumor_detection').brain_tumor_model
                if model is None:
                    return Response({"error": "Model is not loaded yet"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                predictions = model.predict(image)
                predicted_class_index = np.argmax(predictions, axis=1)[0]
                confidence_score = np.max(predictions, axis=1)[0]

                predicted_label = CLASS_LABELS[predicted_class_index]
                result_value = "No Tumor" if predicted_label == "notumor" else predicted_label
                confidence = f"{confidence_score * 100:.2f}%"

                SearchHistory.objects.create(
                    user=request.user,
                    function_type="brain_tumor_detection",
                    query="Image submitted",
                    result=result_value
                )

                return Response({"prediction": result_value, "confidence": confidence}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Error: {e}")
                return Response({"error": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
