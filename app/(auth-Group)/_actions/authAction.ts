
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
  success: true
  statuscode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}


type RegisterState = {
  success: boolean
  statusCode: number
  message: string
  data: {
    id: string
    name: string
    email: string
    activeStatus: string
    role: string
    createdAt: string
    updatedAt: string
    profile: {
      id: string
      userId: string
      profilePhoto: string
      bio: string
      createdAt: string
      updatedAt: string
    }
  }
}

export const loginAction = async (previousSatae: LoginState, formData: FormData) => {

  // console.log('form data ', formData)

  const cookieStore = await cookies()

  const email = formData.get("email")
  const pass = formData.get("password")

  const payload = {
    email,
    password: pass
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  //& set cookies
  if (result.success) {
    const accessToken = result.data.accessToken
    const refreshToken = result.data.refreshToken

    cookieStore.set("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    })
    cookieStore.set('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
    })
    redirect('/dashboard')
  }

  return result
}



export const registerAction = async (previousState: RegisterState, formData: FormData) => {
  // console.log('form data ', formData)

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')

  const payload = {
    name,
    email,
    password,
    role: role || "USER"
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    redirect('/login')
  }
  // console.log('creaet user ', result)

  return result
}