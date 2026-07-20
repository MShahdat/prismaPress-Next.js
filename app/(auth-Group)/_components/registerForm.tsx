"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authAction";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
    } else {
      toast.error(state.message || 'register failed')
    }
  }, [state])


  return (
    <>
      <form action={action} className="space-y-4">
        <Card className="p-4 space-y-1">
          <Input name="name" type="text" placeholder="Enter your name" required />
          <Input name="email" type="email" placeholder="Enter your email" required />
          <Input name="password" type="password" placeholder="Enter your password" required />
          {/* <Input name="role" type="text" placeholder="Enter role" /> */}
          <Button type="submit">
            {
              pending ? "Submitting" : "Register"
            }
          </Button>
        </Card>
      </form>
    </>
  );
};

export default RegisterForm;