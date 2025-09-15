import { ImageIcon, PenBox, Search } from "lucide-react";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const mainItems = [
  { title: "New Chat", url: "#", icon: PenBox },
  { title: "Search Chat", url: "#", icon: Search },
  { title: "Library", url: "#", icon: ImageIcon },
];

const SideBarMainItems = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainItems.map((item) => (
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
     
  );
};

export default SideBarMainItems;
