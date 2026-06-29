"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/layout/mode-toggle"

import Link from "next/link"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
    onClick?: () => void
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()

  return (
    <SidebarGroup {...props}>
      <SidebarSeparator className="-mx-2 mb-2" />
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.onClick ? (
                <SidebarMenuButton onClick={item.onClick} tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
          <ModeToggle />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
