"use client"

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteFooter } from "@/components/site-footer";

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="max-h-screen md:max-h-[calc(100vh-1rem)] flex flex-col overflow-hidden">
        <div key={pathname} className="flex flex-1 flex-col overflow-hidden animate-fade-in-up">
          {children}
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
