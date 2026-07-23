import { cookies } from "next/headers"


export const getPremiumPosts = async () => {

  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium-posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ["public-posts"]
    }
  })


  const result = await res.json()
  // console.log('premium posts', result)

  return result
}