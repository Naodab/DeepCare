import numpy as np
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import SkinCancerDetectionSerializer
from users.models import SearchHistory
from PIL import Image
from django.apps import apps

IMAGE_SIZE = 224

class SkinCancerDetectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = SkinCancerDetectionSerializer(data=request.data)
        if serializer.is_valid():
            image_file = serializer.validated_data["image"]

            try:
                image = Image.open(io.BytesIO(image_file.read()))
                image = image.resize((IMAGE_SIZE, IMAGE_SIZE))
                image = np.array(image) / 255.0
                image = np.expand_dims(image, axis=0)

                model = apps.get_app_config('skin_cancer_detection').skin_cancer_model
                if model is None:
                    return Response({"error": "Model is not loaded yet"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                prediction = model.predict(image)
                result_value = "Malignant" if prediction > 0.5 else "Benign"
                confidence = prediction if result_value=="Malignant" else (1 - prediction)

                SearchHistory.objects.create(
                    user=request.user,
                    function_type="skin_cancer_detection",
                    query="Image submitted",
                    result={"cancer": result_value}
                )
                return Response({"prediction": result_value, "confidence": confidence}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)