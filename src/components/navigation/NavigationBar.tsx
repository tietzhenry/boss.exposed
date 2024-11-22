import React from "react";
import { Layers, House, DraftingCompass, Nfc } from "lucide-react";
import SignInButton from "./clientcomponents/SignInButton";
import SignUpButton from "./clientcomponents/SignUpButton";
import SignOutButton from "./clientcomponents/SignOutButton";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import "./NavigationBar.css";


const NavigationBar = async () => {
  const { data: session, error: invalidSession } = await rpc.api.user.current.get();
  return (
    <nav className="relative overflow-hidden p-4 shadow-md">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="group relative no-underline">
          <div className="flex items-center space-x-2">
            <span className="group relative text-xl font-bold">
              <span className="">Boss</span>
              <span className="animate-pulse-slow font-extrabold text-primary"> . </span>
              <span className="">Exposed</span>
              <div className="animate-pulse-slow absolute inset-0 rounded-full bg-primary/30 blur-xl group-hover:opacity-100" />
            </span>
            <Layers style={{ width: "30px", height: "30px" }} className="animate-pulse-slow ml-1 text-primary" />
          </div>
        </a>

        <div className="flex flex-1 justify-center space-x-6">
          {[
            { icon: <House className="mr-1 h-5 w-5" />, label: "Home", link: "/" },
            { icon: <DraftingCompass className="mr-1 h-5 w-5" />, label: "About Us", link: "/team" },
            { icon: <Nfc className="mr-1 h-5 w-5" />, label: "Contact", link: "/contact" },
          ].map((item, index) => (
            <div key={index} className="group relative flex items-center">
              <div className="absolute inset-0 rounded-full bg-primary/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              <a href={item.link} className="text-gray relative z-10 flex items-center font-semibold no-underline transition-colors hover:text-primary">
                {item.icon}
                {item.label}
              </a>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {invalidSession ? (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          ) : session ? (
            <SignOutButton />
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;