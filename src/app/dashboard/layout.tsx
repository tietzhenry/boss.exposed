import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { setCookies } from "@/utils/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import AdminPanelLayout from "@/components/dashboard/admin-panel-layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout(props: MainLayoutProps) {
  const queryClient = getQueryClient()

  const {data: user, error: unauthorized} = await rpc.api.user.current.get(setCookies())
  if(unauthorized){redirect("/signin")}

  queryClient.setQueryData(["user"], user)

  return <HydrationBoundary state={dehydrate(queryClient)}><AdminPanelLayout>{props.children}</AdminPanelLayout></HydrationBoundary>
}
