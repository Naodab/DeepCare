"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { getUserProfile } from "@/lib/api-actions"
import { Skeleton } from "@/components/ui/skeleton"

type UserProfileData = {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  bloodType: string
  allergies: string
  medicalConditions: string
  emergencyContact: string
  memberSince: string
}

export function UserProfile() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState<UserProfileData | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getUserProfile()
        setProfileData(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load profile",
          description: "There was an error loading your profile information.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [toast])

  const handleViewHistory = () => {
    router.push("/dashboard/history")
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your personal and medical information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profileData?.name || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={profileData?.email || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profileData?.phone || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" value={profileData?.dateOfBirth || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" value={profileData?.gender || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input id="bloodType" value={profileData?.bloodType || ""} readOnly />
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" value={profileData?.allergies || "None"} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conditions">Medical Conditions</Label>
                <Input id="conditions" value={profileData?.medicalConditions || "None"} readOnly />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input id="emergency" value={profileData?.emergencyContact || ""} readOnly />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID</Label>
                <Input id="memberId" value={profileData?.id || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberSince">Member Since</Label>
                <Input id="memberSince" value={profileData?.memberSince || ""} readOnly />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleViewHistory} className="w-full">
            View Medical History
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
        </div>
        <div className="pt-4 border-t">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

