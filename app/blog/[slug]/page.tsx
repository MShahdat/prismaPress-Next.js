import React from 'react';

const page = async ({
  params,
}: {params: Promise<{slug: string}>}) => {
  
  const {slug} = await params

  return (
    <div>
      this is dynamic blog page {slug}
    </div>
  );
};

export default page;