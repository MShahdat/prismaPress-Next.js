import LikeBtn from "../ui/likeBtn";

const page = async () => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts') 
  const data = await posts.json()
  console.log(posts)

  return (
    <div>
      this is blog page
      <LikeBtn />
    </div>
  );
};

export default page;