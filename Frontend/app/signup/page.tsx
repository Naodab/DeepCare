import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { SignUpForm } from "@/components/auth/signup-form"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign Up - DeepCare",
  description: "Create a DeepCare account",
}

export default async function SignUpPage() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="sm" className="gap-1">
          <Home className="h-4 w-4" />
          Return to Home
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information below to create your account</p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

