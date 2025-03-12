import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { UserProfile } from "@/components/profile/user-profile"

export default async function ProfilePage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="My Profile" text="View and manage your personal information" />
      <UserProfile />
    </DashboardShell>
  )
}

