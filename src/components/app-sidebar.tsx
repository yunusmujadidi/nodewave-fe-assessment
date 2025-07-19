import { Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CustomTrigger } from "./custom-trigger";
import Link from "next/link";

const items = [
  {
    title: "To do",
    url: "#",
    icon: Home,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="!bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center justify-between w-full pr-2">
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="w-32 justify-start text-gray-600/90 text-xl font-bold font-inter leading-normal tracking-wide">
                  Nodewave
                </div>
              </Link>
            </SidebarMenuButton>

            <CustomTrigger />
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
