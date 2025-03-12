from django.urls import path
from .views import BrainTumorDetectionView

urlpatterns = [
    path('', BrainTumorDetectionView.as_view(), name='brain_tumor_detection'),
]
