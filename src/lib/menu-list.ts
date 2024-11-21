import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LayoutDashboard ,
  UserRoundPen ,
  Settings2 ,
  Link ,
  Gem,
  Camera ,
  LucideIcon} from "lucide-react";


type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Account",
          icon: UserRoundPen,
          submenus: [
            {
              href: "/dashboard/badges",
              label: "Badges"
            },
            {
              href: "/dashboard/settings",
              label: "Settings"
            }
          ]
        },
        {
          href: "/dashboard/customize",
          label: "Customize",
          icon: Settings2
        },
        {
          href: "/dashboard/links",
          label: "Links",
          icon: Link
        },
        {
          href: "/dashboard/premium",
          label: "Premium",
          icon: Gem
        },
        {
          href: "/dashboard/image_host",
          label: "Image Host",
          icon: Camera
        }
      ]
    },
  ];
}
