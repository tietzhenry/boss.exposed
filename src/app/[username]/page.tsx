"use client"
import { userdisplayHook } from "@/components/hooks/userdisplay-hook";

export default function Page() {

  const {userdisplayQuery} = userdisplayHook()  
  return (
    <div className="text-center text-white font-bold h-1/4 w-2/3 bg-blure">
      test
    </div>
  );}
