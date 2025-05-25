"use client"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareChartGantt
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ExtendedSession } from "@/types/next-auth"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"


const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Over view",
          url: "/dashboard",
        },
        {
          title: "Starred",
          url: "/",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: SquareChartGantt,
      items: [
        {
          title: "Projects",
          url: "/dashboard/projects",
        },
      ],
    },
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

   const { data: sessionData } = useSession();
   const session = sessionData as ExtendedSession | null;
   
   const userInfo = session?.user;

    const userName = userInfo?.name || "Guest";
    const userEmail = userInfo?.email ?? "no-email@example.com";
    const userAvatar = userInfo?.image ?? "/avatars/default.jpg";
    

    const user =  {
        name: userName,
        email: userEmail,
        avatar: userAvatar,
    } 

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 border"
            >
              <Link href="/">
                <Image src="/logo.png" alt="Abdul Kyum" width={30} height={30} className="mb-2"/>
                <span className="text-base font-semibold">Abdul Kyum</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
