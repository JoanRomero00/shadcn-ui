import React from "react"
import {
  Workflow,
  Users,
  FileCheck,
  Folder,
  List,
  FileSpreadsheet,
  Settings2,
  BookOpen,
  HelpCircle,
} from "lucide-react"
import escudo from "@/public/escudo.gif"

export interface NavItem {
  title: string
  url: string
  icon: React.ReactNode
}

export interface DocumentItem {
  name: string
  fullName: string
  url: string
  icon: React.ReactNode
}

export interface UserConfig {
  name: string
  email: string
  avatar?: string
}

export interface SiteConfig {
  name: string
  organization: string
  logo: any
  user: UserConfig
  navMain: NavItem[]
  documents: DocumentItem[]
  navSecondary: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: "Sistema de Integraciones",
  organization: "Poder Judicial de Santa Fe",
  logo: escudo,
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
      title: "Usuarios",
      url: "/usuarios",
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
