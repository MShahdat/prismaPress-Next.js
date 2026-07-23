import React from 'react';
import { PremiumNewsList } from '../_components/news/PremiumNewsList';


const PremiumPage = () => {
  return (
    <div className='mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8'>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Premium News</h1>
        <p className="text-sm text-muted-foreground">
          Exclusive stories for our subscribers
        </p>
      </div>
      <PremiumNewsList />
    </div>
  );
};

export default PremiumPage;