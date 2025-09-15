import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import AppSidebarHeader from "./sidebar-header"
import SidebarOtherGPT from "./sidebar-other-gpts"
import SidebarChats from "./sidebar-chats"
import SidebarNewProject from "./sidebar-new-project"
import SideBarMainItems from "./sidebar-main-items"

const data = {
  user: {
    email:"adilkadivala560@gmail.com",
    name: "Adil Kadival",
    subscription: "free",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

    
      <div className="flex-shrink-0">
        <SideBarMainItems />
      </div>

   
      <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarSeparator />
        <SidebarOtherGPT />
        <SidebarNewProject />
        <SidebarChats />
      </SidebarContent>

 
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}