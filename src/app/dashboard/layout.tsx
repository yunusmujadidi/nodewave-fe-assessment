import { ReactNode } from "react";

import { DashboardNavbar } from "@/components/dashboard-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardNavbar />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
