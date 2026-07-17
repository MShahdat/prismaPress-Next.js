import React from 'react';

export default function AuthorLayout({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <div>
      <p>This is the author layout</p>
      {children}
      <p>This is the author footer</p>
    </div>
  );
}