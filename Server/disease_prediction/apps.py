import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "2"
from django.apps import AppConfig
import pickle
import pandas as pd
from pathlib import Path
from transformers import AutoModelForSequenceClassification, AutoTokenizer

BASE_DIR = Path(__file__).resolve().parent.parent

class DiseasePredictionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'disease_prediction'

    model = None
    model_transformer = None
    tokenizer = None
    label_encoder = None
    precautions = None
    workouts = None
    description = None
    medications = None 
    diets = None

    def ready(self):
        data_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "related_data")
        model_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "model", "svc.pkl")
        transformer_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "model_transformer")
        label_encoder_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "model_transformer", "label_encoder.pkl")
        try:
            self.__class__.model = pickle.load(open(model_path, "rb"))
            self.__class__.model_transformer = AutoModelForSequenceClassification.from_pretrained(transformer_path)
            self.__class__.tokenizer = AutoTokenizer.from_pretrained(transformer_path)
            self.__class__.label_encoder = pickle.load(open(label_encoder_path, "rb"))
            self.precautions = pd.read_csv(f"{data_path}/precautions_df.csv")
            self.workouts = pd.read_csv(f"{data_path}/workout_df.csv")
            self.description = pd.read_csv(f"{data_path}/description.csv")
            self.medications = pd.read_csv(f"{data_path}/medications.csv")
            self.diets = pd.read_csv(f"{data_path}/diets.csv")
            print("Model disease_prediction is successfully loaded!")
        except Exception as e:
            print(f"Failed to load with error {e}.")    