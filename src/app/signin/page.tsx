import SignInForm from "@/components/auth/signin";
import NavigationBar from "@/components/navigation/navigationbar";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {

  const {data: user, error: unauthorized} = await rpc.api.user.current.get(setCookies())
  
  return (
    <div>
      <NavigationBar />
        <SignInForm />
    </div>
  );
};

export default page;
