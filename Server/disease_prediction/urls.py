from django.urls import path
from .views import DiseasePredictionView

urlpatterns = [
    path('', DiseasePredictionView.as_view(), name='disease_prediction'),
]
