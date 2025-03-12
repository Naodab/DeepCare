import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MedicalPredictionForm } from "@/components/features/medical-prediction-form"

export default async function MedicalPredictionPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Medical Prediction"
        text="Describe your symptoms for AI-powered medical recommendations"
      />
      <MedicalPredictionForm />
    </DashboardShell>
  )
}

