from django.db import models
from django.contrib.auth.models import User

class SearchHistory(models.Model):
    FUNCTION_CHOICES = (
        ('brain_tumor_detection', 'Brain Tumor Detection'),
        ('disease_prediction', 'Disease Prediction'),
        ('skin_cancer_detection', 'Skin Cancer Detection'),
    )
    user = models.ForeignKey(User, related_name='search_histories', on_delete=models.CASCADE)
    function_type = models.CharField(max_length=50, choices=FUNCTION_CHOICES)
    query = models.CharField(max_length=255, blank=True, null=True)
    # result = models.JSONField(blank=True, null=True)
    result = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.function_type} - {self.created_at}"


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    blood_type = models.CharField(max_length=5, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    medical_conditions = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
