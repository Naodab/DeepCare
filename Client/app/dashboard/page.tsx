import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ServiceCards } from "@/components/dashboard/service-cards"

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to DeepCare. Select a service to get started." />
      <ServiceCards />
    </DashboardShell>
  )
}

