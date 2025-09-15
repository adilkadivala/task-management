"use client"

import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { MoreHorizontal, Trash2, Share, Pen, Archive } from "lucide-react"

const chats = [
  { title: "Your First Chat", url: "#" },
  { title: "Your Second Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
  { title: "Your Third Chat", url: "#" },
]

const SidebarChats = () => {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[state=collapsed]:hidden">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex-1 ">
          {chats.length > 0 &&
            chats.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton className="py-0" asChild>
                  <Link className="bg-sidebar p-0" href={item.url}>
                    <p className="font-medium">{item.title}</p>
                  </Link>
                </SidebarMenuButton>

                <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "center" : "start"}
                  >
                    <DropdownMenuItem>
                      <Share className="text-muted-foreground" />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pen className="text-muted-foreground" />
                      <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Archive className="text-muted-foreground" />
                      <span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SidebarChats
