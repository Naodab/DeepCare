import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from django.apps import AppConfig
from tensorflow.keras.models import load_model
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class BrainTumorDetectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'brain_tumor_detection'
    print(BASE_DIR)

    brain_tumor_model = None

    def ready(self):
        model_path = os.path.join(BASE_DIR, "ai_modules", 
                                  "brain_tumor_detection_cnn", "model", "model.keras")
        try:
            self.__class__.brain_tumor_model = load_model(model_path)
            print("Model brain_tumor_detection is successfully loaded!")
        except Exception as e:
            print(f"Error when loading model: {e}")
