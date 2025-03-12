from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import BrainTumorDetectionSerializer
from users.models import SearchHistory

class BrainTumorDetectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = BrainTumorDetectionSerializer(data=request.data)
        if serializer.is_valid():
            # Dummy logic: giả sử xử lý ảnh và xác định có hay không có tumor
            result_value = "tumor"  # hoặc "no tumor"
            # Lưu lịch sử tra cứu
            SearchHistory.objects.create(
                user=request.user,
                function_type="brain_tumor_detection",
                query="Image submitted",  # có thể lưu thông tin chi tiết nếu cần
                result={"tumor": result_value}
            )
            return Response({"prediction": result_value, "confidence": "95%"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
