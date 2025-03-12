from django.urls import path
from .views import RegisterView, ProfileView, SearchHistoryListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('history/', SearchHistoryListView.as_view(), name='search_history'),
]
