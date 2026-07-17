"use client"

import { useState } from "react";

const likeBtn = () => {
  const [like, setLike] = useState(0)
  return (
    <div>
      <button onClick={() => {
        setLike(like + 1)
      }} className="bg-blue-600 px-2 py-1 rounded-lg">like {like}</button>
    </div>
  );
};

export default likeBtn;