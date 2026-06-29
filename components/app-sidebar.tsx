"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { NavDocuments } from "@/components/nav-documents"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  Workflow, 
  Users, 
  FileCheck, 
  Folder, 
  List, 
  Settings2, 
  BookOpen, 
  HelpCircle, 
  FileSpreadsheet,
} from "lucide-react"
import { HelpDialog } from "@/components/help-dialog"
import { ManualsDialog } from "@/components/manuals-dialog"
import Image from "next/image"
import escudo from "@/public/escudo.gif"

const data = {
  user: {
    name: "Joan Romero",
    email: "jromero@santafe.gov.ar",
  },
  navMain: [
    {
      title: "Integraciones",
      url: "/integraciones",
      icon: <Workflow className="size-4" />,
    },
    {
      title: "Vocales",
      url: "/vocales",
      icon: <Users className="size-4" />,
    },
    {
      title: "Licencias",
      url: "/licencias",
      icon: <FileCheck className="size-4" />,
    },
    {
      title: "Expedientes",
      url: "/expedientes",
      icon: <Folder className="size-4" />,
    },
  ],
  documents: [
    {
      name: "Por Número/Año",
      fullName: "Integraciones por número/año",
      url: "#",
      icon: <List className="size-4" />,
    },
    {
      name: "Por Rango de Fechas",
      fullName: "Integraciones por Fecha desde/hasta",
      url: "/listados",
      icon: <List className="size-4" />,
    },
    {
      name: "Por Vocal",
      fullName: "Integraciones del Vocal",
      url: "/licencias",
      icon: <List className="size-4" />,
    },
    {
      name: "Totales Mensuales",
      fullName: "Total de Integraciones Mensuales",
      url: "/listados",
      icon: <FileSpreadsheet className="size-4" />,
    },
    {
      name: "Totales por Fecha",
      fullName: "Total de Integraciones entre 2 Fechas",
      url: "/listados",
      icon: <FileSpreadsheet className="size-4" />,
    },
    {
      name: "Mensuales por Vocal",
      fullName: "Total de Integraciones Mensuales por Vocal",
      url: "/listados",
      icon: <FileSpreadsheet className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "/settings",
      icon: <Settings2 className="size-4" />,
    },
    {
      title: "Manuales",
      url: "/manuales",
      icon: <BookOpen className="size-4" />,
    },
    {
      title: "Ayuda y Soporte",
      url: "/ayuda",
      icon: <HelpCircle className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)
  const [isManualsOpen, setIsManualsOpen] = React.useState(false)

  const secondaryItems = data.navSecondary.map((item) => {
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
                    <Image src={escudo} alt="Escudo" className="size-6 group-data-[collapsible=icon]:size-4.5 transition-all object-contain" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-semibold text-white truncate">Sistema de Integraciones</span>
                    <span className="text-[10px] text-sidebar-foreground/60 truncate">Poder Judicial de Santa Fe</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Navegación Principal del Poder Judicial */}
          <NavMain items={data.navMain} />
          {/* Listados e Informes Secundarios */}
          <NavDocuments items={data.documents} />
          {/* Enlaces Secundarios */}
          <NavSecondary items={secondaryItems} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ManualsDialog isOpen={isManualsOpen} onClose={() => setIsManualsOpen(false)} />
    </>
  )
}
