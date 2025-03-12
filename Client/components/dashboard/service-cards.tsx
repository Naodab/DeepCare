import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, HeartPulse, Microscope } from "lucide-react"

export function ServiceCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Brain Tumor Detection</CardTitle>
          <Brain className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <CardDescription className="min-h-[80px]">
            Upload MRI images for AI-powered brain tumor detection and analysis. Our system will analyze the images and
            provide diagnostic insights.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/brain-tumor" className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Medical Prediction</CardTitle>
          <HeartPulse className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <CardDescription className="min-h-[80px]">
            Describe your symptoms to receive potential diagnoses and medical recommendations. Our AI will analyze your
            health state and provide insights.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/medical-prediction" className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Skin Cancer Detection</CardTitle>
          <Microscope className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <CardDescription className="min-h-[80px]">
            Upload images of skin lesions for AI analysis and early skin cancer detection. Our system will analyze the
            images and provide diagnostic insights.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/skin-cancer" className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

