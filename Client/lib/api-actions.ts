// This file contains mock API functions that would normally call a backend service
// In a real application, these would make fetch requests to your API endpoints

import API_BASE_URL from "./api-config"
import { logoutUser } from "./auth-actions"
import getAccessToken from "./tokens"

export async function analyzeBrainMRI(file: File) {
  let accessToken = await getAccessToken()
  if (!accessToken) {
    await logoutUser()
    return
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/api/brain-tumor/`, {
    method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData,
  })
  const result = await response.json()

  return result
}

export async function analyzeMedicalSymptoms(symptoms: string) {
  let accessToken = await getAccessToken()
  if (!accessToken) {
    await logoutUser()
    return
  }

  const formData = new FormData();
  formData.append("symptoms", symptoms);

  const response = await fetch(`${API_BASE_URL}/api/disease-prediction/`, {
    method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData,
  })
  const result = await response.json()

  return result
}

export async function analyzeSkinLesion(file: File) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock response - in a real app, this would come from your AI model
  // This is just for demonstration purposes
  const mockResponses = [
    {
      classification: "Benign (Non-cancerous)",
      confidence: 0.92,
      riskLevel: "Low",
      recommendations: [
        "Monitor for any changes in size, shape, or color",
        "Use sunscreen and protective clothing when outdoors",
        "Regular skin self-examinations",
      ],
    },
    {
      classification: "Potentially Malignant",
      confidence: 0.78,
      riskLevel: "Medium",
      recommendations: [
        "Consult with a dermatologist as soon as possible",
        "Avoid sun exposure to the affected area",
        "Do not scratch or irritate the lesion",
      ],
    },
  ]

  // Randomly select one of the mock responses
  return mockResponses[Math.floor(Math.random() * mockResponses.length)]
}

// Add function to get user history
export async function getUserHistory() {
  let accessToken = await getAccessToken()
  if (!accessToken) {
    await logoutUser()
    return
  }

  const response = await fetch(`${API_BASE_URL}/api/users/history`, {
    method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
  })
  const result = await response.json()

  return result
}

// Add function to get user profile
export async function getUserProfile() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock user profile data
  return {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-04-12",
    gender: "Male",
    bloodType: "O+",
    allergies: "None",
    medicalConditions: "Hypertension",
    emergencyContact: "Jane Doe (+1 555-987-6543)",
    memberSince: "2023-01-15",
  }
}

