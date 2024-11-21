import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export function GridProvider({ children }: WrapperProps) {
  return (
    <div className="min-h-screen w-full h-full dark:bg-gray-950 bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] flex flex-col">
      <div className="absolute pointer-events-none inset-0 flex dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
}
