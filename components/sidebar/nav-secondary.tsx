"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/layout/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

export interface NavSubItem {
  title: string
  url: string
}

export interface NavSecondaryItem {
  title: string
  url: string
  icon: React.ReactNode
  onClick?: () => void
  items?: NavSubItem[]
}

export function NavSecondary({
  items,
  ...props
}: {
  items: NavSecondaryItem[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <SidebarGroup {...props}>
      <SidebarSeparator className="-mx-2 mb-2" />
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavSecondaryItemComponent item={item} pathname={pathname} state={state} />
            </SidebarMenuItem>
          ))}
          <ModeToggle />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function NavSecondaryItemComponent({
  item,
  pathname,
  state,
}: {
  item: NavSecondaryItem
  pathname: string
  state: "expanded" | "collapsed"
}) {
  const hasActiveChild = item.items?.some((sub) => pathname === sub.url)
  const [isOpen, setIsOpen] = React.useState(hasActiveChild)

  React.useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true)
    }
  }, [pathname, hasActiveChild])

  if (item.items && item.items.length > 0) {
    if (state === "collapsed") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton 
              tooltip={item.title} 
              isActive={pathname === item.url || hasActiveChild}
              className={`transition-all duration-300 hover:bg-white/8 ${
                hasActiveChild ? "bg-white/10 text-white" : ""
              }`}
            >
              <span className="transition-transform duration-300 hover:scale-110">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side="right" 
            align="start" 
            className="w-48 rounded-lg"
          >
            {item.items.map((sub) => (
              <DropdownMenuItem key={sub.title} asChild>
                <Link
                  href={sub.url}
                  className={`w-full cursor-pointer px-3 py-2 text-xs rounded-md transition-all duration-200 ${
                    pathname === sub.url 
                      ? "font-semibold bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <span>{sub.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <>
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          tooltip={item.title}
          isActive={pathname === item.url || hasActiveChild}
          className={`w-full justify-between group transition-all duration-250 ${
            hasActiveChild 
              ? "bg-white/10 text-white font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
              : "text-white/80 hover:text-white hover:bg-white/6"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </div>
          <ChevronDown
            className={`size-3.5 opacity-60 transition-transform duration-300 ease-out group-hover:opacity-100 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </SidebarMenuButton>
        {isOpen && (
          <SidebarMenuSub className="transition-all duration-300 ease-in-out border-l border-white/10 pl-2.5 ml-3.5 my-0.5">
            {item.items.map((sub, index) => (
              <SidebarMenuSubItem 
                key={sub.title}
                className="animate-in fade-in slide-in-from-top-1 duration-200"
                style={{ 
                  animationDelay: `${index * 40}ms`,
                  animationFillMode: 'both' 
                }}
              >
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === sub.url}
                  className={`group relative w-full transition-all duration-200 rounded-md ${
                    pathname === sub.url 
                      ? "bg-white/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : "text-white/70 hover:text-white hover:bg-white/4"
                  }`}
                >
                  <Link href={sub.url} className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md">
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">{sub.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </>
    )
  }

  if (item.onClick) {
    return (
      <SidebarMenuButton 
        onClick={item.onClick} 
        tooltip={item.title}
        className="transition-all duration-200 text-white/85 hover:text-white hover:bg-white/6"
      >
        {item.icon}
        <span>{item.title}</span>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton 
      asChild 
      tooltip={item.title} 
      isActive={pathname === item.url}
      className={`transition-all duration-200 ${
        pathname === item.url 
          ? "bg-white/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
          : "text-white/85 hover:text-white hover:bg-white/6"
      }`}
    >
      <Link href={item.url}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  )
}
