"use server"

import { cookies } from "next/headers"


export const subscribeStatus = async () => {

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/subscription/status`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    }
  })

  const result = await res.json()
  console.log('subscription status ', result)

  return result

}