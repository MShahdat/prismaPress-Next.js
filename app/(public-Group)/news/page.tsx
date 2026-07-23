import React from 'react';
import { PublicNewsList } from '../_components/news/PublicNewsList';

const NewsPage = () => {
  return (
    <div className='mx-auto max-w-7xl space-y-6 px-4 py-10'>
      <div className='flex flex-col gap-4'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold'>News</h1>
          <p className='text-sm text-muted-foreground'>Browse the latest published stories</p>
        </div>
        <PublicNewsList />
      </div>
    </div>
  );
};

export default NewsPage;