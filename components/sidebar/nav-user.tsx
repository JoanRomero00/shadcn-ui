"use client"

import { useRouter } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { EllipsisVerticalIcon, KeyRound, LogOutIcon } from "lucide-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U"

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-row items-center gap-2 group-data-[state=collapsed]:flex-col">
        {/* Parte izquierda: Perfil con Dropdown para Cambiar Contraseña */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4 text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <KeyRound className="mr-2 h-4 w-4" />
              <span>Cambiar Contraseña</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Parte derecha: Botón de Cerrar Sesión Directo */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-9 w-9 group-data-[state=collapsed]:h-8 group-data-[state=collapsed]:w-8 text-sidebar-foreground/70 hover:text-red-400 hover:bg-red-950/20 rounded-md transition-all shrink-0"
          title="Cerrar sesión"
          onClick={() => router.push("/login")}
        >
          <LogOutIcon className="size-4" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
