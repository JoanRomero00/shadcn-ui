"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    fullName?: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60 text-[10px] font-bold uppercase tracking-wider group-data-[collapsible=icon]:hidden">
        Listados y Reportes
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.fullName || item.name} className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/90">
              <Link href={item.url}>
                {item.icon}
                <span className="truncate" title={item.fullName || item.name}>
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
