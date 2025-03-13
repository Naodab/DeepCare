from django.shortcuts import render

from rest_framework import status, permissions
from rest_framework.views import APIView
from django.apps import apps
from rest_framework.response import Response
from .serializers import DiseasePredictionSerializer
from users.models import SearchHistory
import numpy as np
import ast


app_config = apps.get_app_config("disease_prediction")
model = app_config.model
precautions = app_config.precautions
workouts = app_config.workouts
description = app_config.description
medications = app_config.medications
diets = app_config.diets

symptoms_dict = {'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}

class DiseasePredictionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        symptoms = request.data.get("symptoms", "")
        serializer = DiseasePredictionSerializer(data={"symptoms": symptoms})
        if serializer.is_valid():
            if isinstance(symptoms, str):
                user_symptoms = [s.strip("[]' ") for s in symptoms.split(',')]
            elif isinstance(symptoms, list):
                user_symptoms = [s.strip() for s in symptoms]
            else:
                return Response({"error": "Invalid symptoms format"}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                predicted_disease = self.get_predicted_value(user_symptoms)
                desc, pre, med, die, wor = self.get_recommendation(predicted_disease)
                result_data = {
                    'disease': predicted_disease,
                    'description': desc,
                    'precaution': pre,
                    'medications': med,
                    'diets': die,
                    'workouts': wor
                }

                SearchHistory.objects.create(
                    user = request.user,
                    function_type="disease_prediction",
                    query=f"Symptoms: {symptoms}",
                    result=predicted_disease
                )

                return Response(result_data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_recommendation(self, predicted_disease):
        desc = description[description['Disease'] == predicted_disease]['Description'].values
        desc = desc[0] if len(desc) > 0 else ""

        pre = precautions[precautions['Disease'] == predicted_disease][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
        pre = pre.values.flatten().tolist() if not pre.empty else []
        if pre:
            if len(pre) > 1:
                pre_text = f"You should {', '.join(pre[:-1])} and {pre[-1]}."
            else:
                pre_text = f"You should {pre[0]}."
        else:
            pre_text = "No precautions available."
        pre = pre_text

        med = medications[medications['Disease'] == predicted_disease]['Medication']
        med = med.apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
        med = med.explode().tolist()
        if med:
            if len(med) > 1:
                med_text = f"You had better consider using the following medicine: {', '.join(med[:-1])} and {med[-1]}. But you should ask your doctor for advice first!"
            else:
                med_text = f"You had better consider using the following medicine: {med[0]}. But you should ask your doctor for advice first!"
        else:
            med_text = "No specific medication is recommended. Please consult a doctor."
        med = med_text

        die = diets[diets['Disease'] == predicted_disease]['Diet']
        die = die.apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
        die = die.explode().tolist()
        if die:
            if len(die) > 1:
                die_text = f"Eating healthily to stay strong is also essential. You should consider eating {', '.join(die[:-1])} and {die[-1]}."
            else:
                die_text = f"Eating healthily to stay strong is also essential. You should consider eating {die[0]}."
        else:
            die_text = "Eating healthily to stay strong is also essential. However, there are no specific dietary recommendations for this condition."
        die = die_text

        wor = workouts[workouts['disease'] == predicted_disease]['workout'].tolist() if not workouts.empty else []
        if wor:
            wor = [w.capitalize() for w in wor]
            if len(wor) > 4:
                wor_text = f"You should {', '.join(wor[:3])} and {wor[3]}. Also, you should {', '.join(wor[4:-1])} and {wor[-1]}."
            else:
                wor_text = f"You should {', '.join(wor[:-1])} and {wor[-1]}."
        else:
            wor_text = "There are no specific workout recommendations for this condition."
        wor = wor_text

        return desc, pre, med, die, wor
    
    def get_predicted_value(self, patient_symptoms):
        input_vector = np.zeros(len(symptoms_dict))
        for item in patient_symptoms:
            if item in symptoms_dict:
                input_vector[symptoms_dict[item]] = 1
        return model.predict([input_vector])[0]