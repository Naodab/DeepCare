"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getUserHistory } from "@/lib/api-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Brain, HeartPulse, Microscope } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type HistoryItem = {
  id: string
  type: string
  date: string
  result: string
}

export function UserHistory() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [historyData, setHistoryData] = useState<HistoryItem[]>([])

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getUserHistory()
        setHistoryData(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load history",
          description: "There was an error loading your medical history.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [toast])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "brain-tumor":
        return <Brain className="h-5 w-5" />
      case "medical-prediction":
        return <HeartPulse className="h-5 w-5" />
      case "skin-cancer":
        return <Microscope className="h-5 w-5" />
      default:
        return null
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "brain-tumor":
        return "Brain Tumor Detection"
      case "medical-prediction":
        return "Medical Prediction"
      case "skin-cancer":
        return "Skin Cancer Detection"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading) {
    return <HistorySkeleton />
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>Your past diagnostic results from DeepCare</CardDescription>
        </CardHeader>
        <CardContent>
          {historyData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No history found. Start using our diagnostic tools to build your medical history.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {historyData.map((item) => (
                <div key={item.id} className="flex items-start p-4 border rounded-lg">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">{getTypeIcon(item.type)}</div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <h3 className="font-medium">{getTypeName(item.type)}</h3>
                      <span className="text-sm text-muted-foreground">{formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Result:</span>
                      <Badge
                        variant={
                          item.result.includes("No Tumor") || item.result.includes("Benign") ? "outline" : "destructive"
                        }
                      >
                        {item.result}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => router.back()}>
          Back to Profile
        </Button>
      </div>
    </div>
  )
}

function HistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start p-4 border rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full mr-4" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

