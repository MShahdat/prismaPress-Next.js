import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { IPOSTS } from '@/lib/interface';
import { MessageCircle, SparkleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';


interface POST {
  posts: IPOSTS
}

const NewsCard = ({ posts }: POST) => {
  console.log(' posts ', posts)

  return (
    <Card>
      {/* <img src={posts.thumbnail} alt={posts.title} /> */}
      <Image className='object-cover'
        unoptimized
        src={posts.thumbnail}
        alt={posts.title}
        width={600}
        height={100}
      />

      <div className='-mt-2 px-2 flex flex-col gap-2'>
        <div className='flex flex-wrap items-center gap-1.5'>
          {
            posts.isPremium &&
            <Badge variant="default">
              <SparkleIcon data-icon="inline-start" />
              Premium
            </Badge>
          }
          {
            posts?.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))
          }
        </div>
        <h1 className='text-lg font-medium'>{posts.title}</h1>
        <p className='line-clamp-3 whitespace-pre-line text-muted-foreground'>{posts.content}</p>
        <div className='text-muted-foreground flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <p className=''>By <span className='font-medium'>{posts?.author?.name}</span></p>
            <p>{new Date(posts.createdAt).toLocaleDateString()}</p>
          </div>
          <div className='flex items-center gap-1'>
            <MessageCircle className='size-3.5' />
            <p className='font-medium'>{posts._count.comments || 0}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;