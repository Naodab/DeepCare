import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MedicalPredictionForm } from "@/components/features/medical-prediction-form"

const symptoms = [
  'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 
  'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 
  'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness'
];

function SymptomsList({ symptoms }: { symptoms: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {symptoms.map((symptom, index) => (
        <div key={index} className="bg-purple-600 text-white p-3 rounded-lg text-center">
          {symptom}
        </div>
      ))}
    </div>
    );
}

export default async function MedicalPredictionPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Medical Prediction"
        text="Describe your symptoms for AI-powered medical recommendations. Following are some common symptoms."
      />
      <div>
        <div className="mt-0 flex flex-wrap gap-4">
          {symptoms.map((symptom, index) => (
            <div 
              key={index} 
              className="bg-primary/90 text-primary-foreground hover:bg-primary/60 text-white px-4 py-2 rounded-lg text-center text-sm whitespace-nowrap"
            >
              {symptom}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <MedicalPredictionForm />
      </div>
    </DashboardShell>
  )
}

