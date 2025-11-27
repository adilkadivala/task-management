"use client";

import * as React from "react";
import {
  IconCalendar,
  IconDashboard,
  IconListDetails,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const data = {
  // footer
  user: {
    name: "Adil",
    email: "adil@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  // main
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Task",
      url: "/dashboard/task-management",
      icon: IconListDetails,
    },
    {
      title: "Calender",
      url: "/dashboard/calender",
      icon: IconCalendar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <Workflow className="w-5 h-5 text-primary" />
                <span className="text-base font-semibold">TaskFlow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
