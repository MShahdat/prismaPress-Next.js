
export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";


export interface IPOSTS {
  id: string
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  status: IPostStatus
  tags: string[]
  views: number
  authorId: string
  isPremium: boolean
  createdAt: string
  updatedAt: string
  _count: {
    comments: number
  },
  author: {
    name: string
  }
}