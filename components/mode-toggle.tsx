"use client"

import * as React from "react"
import { Sun as SunIcon, Moon as MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Esperar a que el componente esté montado en el cliente para evitar errores de hidratación
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="cursor-pointer" disabled>
          <MoonIcon className="size-4" />
          <span>Modo Oscuro</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        tooltip={theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        className="cursor-pointer"
      >
        {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
        <span>
          Modo {theme === "dark" ? "Claro" : "Oscuro"}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
