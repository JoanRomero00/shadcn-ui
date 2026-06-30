"use client"

import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import { NavDocuments } from "@/components/sidebar/nav-documents"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import dynamic from "next/dynamic"

const HelpDialog = dynamic(() => import("@/components/dialogs/help-dialog").then(mod => mod.HelpDialog), {
  ssr: false,
})
const ManualsDialog = dynamic(() => import("@/components/dialogs/manuals-dialog").then(mod => mod.ManualsDialog), {
  ssr: false,
})
import Image from "next/image"
import { siteConfig } from "@/config/site"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)
  const [isManualsOpen, setIsManualsOpen] = React.useState(false)

  const secondaryItems = siteConfig.navSecondary.map((item) => {
    if (item.title === "Ayuda y Soporte") {
      return {
        ...item,
        url: "#",
        onClick: () => setIsHelpOpen(true),
      }
    }
    if (item.title === "Manuales") {
      return {
        ...item,
        url: "#",
        onClick: () => setIsManualsOpen(true),
      }
    }
    return item
  })

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <a href="/integraciones">
                  <div className="flex aspect-square size-8 group-data-[collapsible=icon]:size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground transition-all">
                    <Image src={siteConfig.logo} alt="Logo" className="size-6 group-data-[collapsible=icon]:size-4.5 transition-all object-contain" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-semibold text-white truncate">{siteConfig.name}</span>
                    <span className="text-[10px] text-sidebar-foreground/60 truncate">{siteConfig.organization}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Navegación Principal */}
          <NavMain items={siteConfig.navMain} />
          {/* Listados e Informes Secundarios */}
          <NavDocuments items={siteConfig.documents} />
          {/* Enlaces Secundarios */}
          <NavSecondary items={secondaryItems} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={siteConfig.user} />
        </SidebarFooter>
      </Sidebar>

      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ManualsDialog isOpen={isManualsOpen} onClose={() => setIsManualsOpen(false)} />
    </>
  )
}
