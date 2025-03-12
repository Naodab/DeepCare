import { cookies } from "next/headers"

type User = {
  id: string
  name: string
  email: string
}

type Session = {
  user: User
}

export async function getSession(): Promise<Session | null> {
  const cookiesFactory = await cookies()
  const sessionCookie = cookiesFactory.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as Session
  } catch {
    return null
  }
}

export async function getUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user || null
}

