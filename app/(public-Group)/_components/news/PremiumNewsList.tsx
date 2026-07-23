import { IPOSTS } from "@/lib/interface";
import { getPublicPosts } from "../../_actions/getPublicPosts";
import NewsCard from "./NewsCard";
import { getPremiumPosts } from "../../_actions/getPremiumPosts";


export const PremiumNewsList = async () => {

  const result = await getPremiumPosts()
  console.log('premium posts', result)

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No news found</p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          result.data.map((post: IPOSTS) => (
            <NewsCard key={post.id} posts={post} />
          ))
        }
      </div>
    </div>
  )
}