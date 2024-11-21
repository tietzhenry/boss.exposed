"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

// Define props for the InfoCard component
interface InfoCardProps {
  icon: React.ReactNode; // Allows any React element as an icon
  title: string;
  value: string;
}

export function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <CardContainer className="inter-var h-[100px]"> {/* Reduced overall height */}
      <CardBody className="bg-primary/5 border rounded-xl p-2 shadow-md"> {/* Further reduced padding */}
        <div className="flex items-start">
          <div className="mr-1.5"> {/* Reduced margin between icon and text */}
            {icon}
          </div>
          <div>
            <CardItem className="text-lg font-bold text-neutral-600 dark:text-white"> {/* Keep title font size */}
              {title}
            </CardItem>
            <CardItem className="text-neutral-500 text-sm dark:text-neutral-300">
              {value}
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
