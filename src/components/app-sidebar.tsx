"use client"

import * as React from "react"
import {
  Bot,
  Command,
  SquareTerminal,
} from "lucide-react"
import {  useAuth } from "@clerk/nextjs"
import { NavMain } from "~/components/nav-main"

import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Separator } from "./ui/separator"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Stocks",
          url: "/stocks",
        },
        {
          title: "Market News",
          url: "/marketnews",
        },
      ],
    }
  ],

navMainUser: [
    {
      title: "User",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Watching",
          url: "/watching",
        },
      ],
    },
   
  ]
  
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isSignedIn} = useAuth();
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary  text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Finance Data</span>
                  
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator/>
       {isSignedIn && (
          <NavMain items={data.navMainUser}/>
          )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
