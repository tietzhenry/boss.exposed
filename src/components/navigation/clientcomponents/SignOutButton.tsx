"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { AuthHook } from '@/components/hooks/auth-hook';

const SignOutButton = () => {
  const router = useRouter();
  const {signOutMutation} = AuthHook()
  const handleLogout = async () => {
    await signOutMutation.mutateAsync().then(() => {
    router.push("/signin") ; router.refresh();})
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="rounded-full font-semibold relative group">
      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      <LogOut className="w-5 h-5 mr-2"/> 
      Log Out
    </Button>
  );
};

export default SignOutButton;
