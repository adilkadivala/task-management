"use client";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CircleArrowDown,
  CircleQuestionMark,
  CreditCard,
  Flag,
  LifeBuoy,
  LogOut,
  NotebookPen,
  ReceiptText,
  Settings,
  Sparkles,
  SquareSlash,
  User,
  UserCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    email: string;
    name: string;
    subscription: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">A</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.subscription}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="top"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex text-muted-foreground items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserCircle className="size-5 " />
                <span className="truncate font-medium">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade Plan
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Customize ChatGPT
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="w-full flex items-center justify-between">
                <div className="flex-1 flex gap-2 items-center">
                  <LifeBuoy className="size-4" />
                  Help
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem>
                  <CircleQuestionMark />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NotebookPen />
                  Release Notes
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReceiptText />
                  Terms & Policies
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag />
                  Report Bug
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleArrowDown />
                  Download Apps
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SquareSlash />
                  Keyboard Shortcuts
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
