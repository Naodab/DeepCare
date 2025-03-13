from django.apps import AppConfig
import os
import pickle
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class DiseasePredictionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'disease_prediction'

    model = None
    precautions = None
    workouts = None
    description = None
    medications = None 
    diets = None

    def ready(self):
        data_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "related_data")
        model_path = os.path.join(BASE_DIR, "ai_modules", "disease_prediction", "model", "svc.pkl")
        try:
            self.__class__.model = pickle.load(open(model_path, "rb"))
            self.precautions = pd.read_csv(f"{data_path}/precautions_df.csv")
            self.workouts = pd.read_csv(f"{data_path}/workout_df.csv")
            self.description = pd.read_csv(f"{data_path}/description.csv")
            self.medications = pd.read_csv(f"{data_path}/medications.csv")
            self.diets = pd.read_csv(f"{data_path}/diets.csv")
            print("Successfully load AI trained model and logical data!")
        except Exception as e:
            print(f"Failed to load with error {e}.")    