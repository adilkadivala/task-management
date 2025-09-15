import { Flower, PanelLeft } from "lucide-react";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const AppSidebarHeader = () => {
  return (
    <div className="px-1">
      {/* --- When OPEN --- */}
      <div className="flex items-center justify-between group-data-[state=collapsed]:hidden">
        <Flower className="size-6 text-sidebar-foreground" />
        <SidebarTrigger className="size-6 p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md">
          <PanelLeft className="size-4" />
        </SidebarTrigger>
      </div>

      {/* --- When COLLAPSED --- */}
      <div className="hidden group-data-[state=collapsed]:flex items-center justify-center">
        {/* Default Flower */}
        <Flower className="size-6 text-sidebar-foreground group-hover:hidden" />

        {/* PanelLeft only appears on hover */}
        <div className="hidden group-hover:flex">
          <SidebarTrigger className="size-6 p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md">
            <PanelLeft className="size-4" />
          </SidebarTrigger>
        </div>
      </div>
    </div>
  );
};

export default AppSidebarHeader;
