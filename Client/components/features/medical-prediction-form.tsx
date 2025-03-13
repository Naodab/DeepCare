"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { analyzeMedicalSymptoms } from "@/lib/api-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import getAccessToken from "@/lib/tokens"

export function MedicalPredictionForm() {
  const { toast } = useToast()
  const [symptoms, setSymptoms] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // Update the state type to match the new expanded API response format
  const [result, setResult] = useState<{
    disease: string
    description: string
    precaution: string
    medications: string
    workouts: string
    diets: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symptoms.trim()) {
      toast({
        variant: "destructive",
        title: "No symptoms provided",
        description: "Please describe your symptoms first.",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint
      const result = await analyzeMedicalSymptoms(symptoms)

      setResult(result)

      toast({
        title: "Analysis complete",
        description: "Your symptoms have been analyzed successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your symptoms. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
    let access_token = await getAccessToken()
    console.log(access_token)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="symptoms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Describe your symptoms
                </label>
                <Textarea
                  id="symptoms"
                  placeholder="Please describe your symptoms in detail. Include when they started, their severity, and any other relevant information."
                  className="min-h-[150px]"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={!symptoms.trim() || isLoading}>
          {isLoading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>
      </form>

      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Diagnosis Results</h3>
                <p className="text-muted-foreground">Based on your symptoms, our AI has identified the following:</p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border">
                <h4 className="text-lg font-semibold text-primary">{result.disease}</h4>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="precaution">Precautions</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="workouts">Workouts</TabsTrigger>
                  <TabsTrigger value="diets">Diet</TabsTrigger>
                  <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-4 border rounded-md mt-4">
                  <h5 className="font-medium mb-2">Description</h5>
                  <p>{result.description}</p>
                </TabsContent>

                <TabsContent value="precaution" className="p-4 border rounded-md mt-4">
                  <h5 className="font-medium mb-2">Recommended Precautions</h5>
                  <p>{result.precaution}</p>
                </TabsContent>

                <TabsContent value="medications" className="p-4 border rounded-md mt-4">
                  <h5 className="font-medium mb-2">Suggested Medications</h5>
                  <p>{result.medications}</p>
                </TabsContent>

                <TabsContent value="workouts" className="p-4 border rounded-md mt-4">
                  <h5 className="font-medium mb-2">Exercise Recommendations</h5>
                  <p>{result.workouts}</p>
                </TabsContent>

                <TabsContent value="diets" className="p-4 border rounded-md mt-4">
                  <h5 className="font-medium mb-2">Dietary Advice</h5>
                  <p>{result.diets}</p>
                </TabsContent>

                <TabsContent value="disclaimer" className="p-4 border rounded-md mt-4 bg-muted">
                  <h5 className="font-medium mb-2">Medical Disclaimer</h5>
                  <p className="text-sm">
                    This information is not a substitute for professional medical advice, diagnosis, or treatment.
                    Always seek the advice of your physician or other qualified health provider with any questions you
                    may have regarding a medical condition.
                  </p>
                </TabsContent>
              </Tabs>

              <Button className="w-full" variant="outline" onClick={() => window.print()}>
                Print Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

