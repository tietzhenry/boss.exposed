"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ScanFace } from 'lucide-react';

const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <Button onClick={handleSignIn} variant="outline" className="rounded-full font-semibold relative group">
      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      <ScanFace className="w-5 h-5 mr-2"/> 
      Sign In
    </Button>
  );
};

export default SignInButton;
