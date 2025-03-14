"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import API_BASE_URL from "./api-config"

type AuthResult = {
  success: boolean
  error?: string
}

export async function loginUser(data: {
  email: string
  password: string
}): Promise<AuthResult> {

  try {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Invalid email or password",
      };
    }
    
    const result = await response.json();

    const cookieStore = await cookies();
    cookieStore.set(
      "session",
      JSON.stringify({
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    cookieStore.set(
      "access_token",
      result.access,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/"
      }
    )

    cookieStore.set(
      "refresh_token",
      result.access,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/"
      }
    )

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function registerUser(data: {
  username: string
  name: string
  email: string
  password: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  bloodType?: string
  allergies?: string
  medicalConditions?: string
  emergencyContact?: string
}): Promise<AuthResult> {
  try {
    const formattedData = {
      username: data.username,
      email: data.email,
      password: data.password,
      profile: {
        full_name: data.name,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        gender: data.gender,
        blood_type: data.bloodType,
        allergies: data.allergies,
        medical_conditions: data.medicalConditions,
        emergency_contact: data.emergencyContact,
      },
    }
    console.log(formattedData)

    const response = await fetch(`${API_BASE_URL}/api/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || "Invalid registration data"
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

