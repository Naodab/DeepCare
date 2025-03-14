from django.urls import path
from .views import SkinCancerDetectionView

urlpatterns = [
    path('', SkinCancerDetectionView.as_view(), name='skin_cancer_detection'),
]