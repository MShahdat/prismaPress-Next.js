

export const getPublicPosts = async () => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ["public-posts"]
    }
  })


  const result = await res.json()
  // console.log('public posts', result)

  return result
}