import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";


interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  return <>{props.children}</>
}
