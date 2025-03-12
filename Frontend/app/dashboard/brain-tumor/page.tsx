import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BrainTumorForm } from "@/components/features/brain-tumor-form"

export default async function BrainTumorPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Brain Tumor Detection" text="Upload an MRI image for analysis" />
      <BrainTumorForm />
    </DashboardShell>
  )
}

