import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function Home() {
  
  const user = await getMe()
  // console.log('user', user)

  return (
    <div className="">
      Hello Next js 
      <Button
      size={"sm"}
      variant={"default"}
      >
        click me
      </Button>
    </div>
  );
}
