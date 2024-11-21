"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { UserRoundPen } from 'lucide-react';

const SignUpButton = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <Button onClick={handleSignUp} className="rounded-full relative group animate-pulse-slow">
      <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl opacity-50 animate-pulse"/>
      <UserRoundPen className="w-5 h-5 mr-2"/> 
      Sign Up
    </Button>
  );
};

export default SignUpButton;
