import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from django.apps import AppConfig
from pathlib import Path
from tensorflow.keras.models import load_model

BASE_DIR = Path(__file__).resolve().parent.parent

class SkinCancerDetectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'skin_cancer_detection'

    skin_cancer_model = None

    def ready(self):
        model_path = os.path.join(BASE_DIR, "ai_modules",
                                  "skin_cancer_detection", "model", "skin_cancer_cnn.h5")
        try:
            self.__class__.skin_cancer_model = load_model(model_path)
            print("Model skin_cancer_detection is successfully loaded!")
        except Exception as e:
            print(f"Error when loading model skin cancer: {e}")