"use client";

import * as React from "react";

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
import { LayoutDashboard, ListChecks, Users, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { TeamSwitcher } from "./team-switcher";

const data = {
  // teams

  teams: [
    // {
    //   name: "Acme Inc",
    //   logo: GalleryVerticalEnd,
    //   plan: "Enterprise",
    // },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],

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
      icon: LayoutDashboard,
    },
    {
      title: "Task",
      url: "/dashboard/task-management",
      icon: ListChecks,
    },
    {
      title: "Teams",
      url: "/dashboard/teams",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        {data.teams.length > 0 && <TeamSwitcher teams={data.teams} />}
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
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
