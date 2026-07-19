import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';
import React, { ReactNode } from 'react';

const AuthLayout = async ({
  children
}: { children: ReactNode }) => {
  const user = await getMe()

  return (
    <>
    <Navbar user = {user}/>
      <div className='max-w-7xl mx-auto bg-red-00'>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;