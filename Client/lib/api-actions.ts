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
  let accessToken = await getAccessToken()
  if (!accessToken) {
    await logoutUser()
    return
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/api/skin-cancer/`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
    body: formData
  })
  const result = await response.json()
  console.log(result)

  return result
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

export async function getUserProfile() {
  let accessToken = await getAccessToken()
  if (!accessToken) {
    await logoutUser()
    return
  }

  const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
  })

  const result = await response.json()

  return {
    id: result.id,
    name: result.profile?.full_name,
    email: result.email,
    phone: result.profile?.phone,
    dateOfBirth: result.profile?.date_of_birth,
    gender: result.profile?.gender,
    bloodType: result.profile?.blood_type,
    allergies: result.profile?.allergies,
    medicalConditions: result.profile?.medical_conditions,
    emergencyContact: result.profile?.emergency_contact,
    memberSince: result.profile?.created_at,
  }
}

