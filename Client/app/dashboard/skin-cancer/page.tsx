import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SkinCancerForm } from "@/components/features/skin-cancer-form"

export default async function SkinCancerPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Skin Cancer Detection" text="Upload an image of a skin lesion for analysis" />
      <SkinCancerForm />
    </DashboardShell>
  )
}

