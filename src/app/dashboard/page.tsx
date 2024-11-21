"use client";
import { InfoCard } from "@/components/3dcard";
import { ContentLayout } from "@/components/dashboard/content-layout";
import { ProfileViewChart } from "@/components/dashboard/profileview-chart";
import { UserHook } from "@/components/hooks/user-hook";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { User, UserCheck, Key, Eye } from "lucide-react";

export default function Page() {
  const { userQuery } = UserHook();
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  return (
    <>
      <ContentLayout title="Dashboard">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
          className="center items-center"
        >
          <div style={{ height: "120px" }}>
            <InfoCard
              icon={
                <User
                  style={{ color: "primary", width: "24px", height: "24px" }}
                  className="text-primary"
                />
              }
              title="Username"
              value={userQuery.data?.username || ""}
            />
          </div>
          <div style={{ height: "120px" }}>
            <InfoCard
              icon={
                <UserCheck
                  style={{ color: "primary", width: "24px", height: "24px" }}
                  className="text-primary"
                />
              }
              title="Alias"
              value={userQuery.data?.alias || "No alias set"}
            />
          </div>
          <div style={{ height: "120px" }}>
            <InfoCard
              icon={
                <Key
                  style={{ color: "primary", width: "24px", height: "24px" }}
                  className="text-primary"
                />
              }
              title="UID"
              value={userQuery.data?.userCount.toString() || "0"}
            />
          </div>
          <div style={{ height: "120px" }}>
            <InfoCard
              icon={
                <Eye
                  style={{ color: "primary", width: "24px", height: "24px" }}
                  className="text-primary"
                />
              }
              title="Profile Views"
              value={userQuery.data?.profileViews.toString() || "0"}
            />
          </div>
        </div>
        <ProfileViewChart/>
        <div className="flex justify-center mt-14"> 
  <div className="w-5/6 h-16 rounded-2xl border border-gray-500 flex items-center justify-between px-4">
    <span className="text-white font-bold">Copyright © 2024 Boss.Exposed
    </span>
    <span className="text-white">
      <DiscordLogoIcon className="h-6 w-6" /> 
    </span>
  </div>
</div>

      </ContentLayout>
    </>
  );
}
