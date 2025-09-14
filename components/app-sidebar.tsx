import { Flower, Image, PenBox, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  { title: "New Chat", url: "#", icon: PenBox },
  { title: "Search Chat", url: "#", icon: Search },
  { title: "Library", url: "#", icon: Image },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group relative">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between mb-5 px-1.5">
            <Flower className="group-data-[state=collapsed]:opacity-0" />
            <SidebarTrigger className="text-muted-foreground transition-opacity duration-300 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:group-hover:opacity-100" />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
