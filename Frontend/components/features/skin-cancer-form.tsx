"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"
import { analyzeSkinLesion } from "@/lib/api-actions"

export function SkinCancerForm() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    classification: string
    confidence: number
    riskLevel: string
    recommendations: string[]
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) {
      return
    }

    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file.",
      })
      return
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      })
      return
    }

    setFile(selectedFile)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)

    // Reset result when new file is selected
    setResult(null)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload an image first.",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call an API endpoint
      const result = await analyzeSkinLesion(file)

      setResult(result)

      toast({
        title: "Analysis complete",
        description: "Skin lesion image has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing the image. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Always render the file input, but keep it hidden */}
        <input
          type="file"
          id="skin-file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          onClick={(e) => (e.currentTarget.value = "")} // Clear the input value to allow selecting the same file again
        />

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {!preview ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                  <div className="mb-2 text-lg font-medium">Drop your skin lesion image here or click to browse</div>
                  <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, JPEG up to 5MB</p>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => document.getElementById("skin-file-upload")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              ) : (
                <div className="relative flex flex-col items-center">
                  <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg mb-4">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt="Skin Lesion Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => document.getElementById("skin-file-upload")?.click()}
                    >
                      Replace Image
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleRemoveFile}>
                      Remove Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={!file || isLoading}>
          {isLoading ? "Analyzing..." : "Send for Analysis"}
        </Button>
      </form>

      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Analysis Results</h3>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">Classification:</span>
                  <span
                    className={
                      result.classification.includes("Malignant")
                        ? "text-red-500 font-bold"
                        : "text-green-500 font-bold"
                    }
                  >
                    {result.classification}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Confidence:</span>
                  <span>{(result.confidence * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Risk Level:</span>
                  <span
                    className={
                      result.riskLevel === "High"
                        ? "text-red-500 font-bold"
                        : result.riskLevel === "Medium"
                          ? "text-yellow-500 font-bold"
                          : "text-green-500 font-bold"
                    }
                  >
                    {result.riskLevel}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium">Note:</p>
                  <p>
                    This is an AI-assisted analysis and should not replace professional medical diagnosis. Please
                    consult with a dermatologist for proper medical advice.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

