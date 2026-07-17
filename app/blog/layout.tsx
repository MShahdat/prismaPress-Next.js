import React from 'react';

const blogsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <p> this is the blogs layout that is work only for blogs route</p>
      {children}
      <p>blog footer</p>
    </div>
  );
};

export default blogsLayout;