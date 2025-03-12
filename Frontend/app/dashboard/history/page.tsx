import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { UserHistory } from "@/components/profile/user-history"

export default async function HistoryPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Medical History" text="View your past diagnostic results" />
      <UserHistory />
    </DashboardShell>
  )
}

