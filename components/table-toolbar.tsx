import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterConfig {
  key: string
  value: string
  placeholder: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

interface TableToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: FilterConfig[]
  onClearFilters?: () => void
  showClearButton?: boolean
  exportActions?: {
    label: string
    icon: React.ReactNode
    onClick: () => void
  }[]
  className?: string
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filters = [],
  onClearFilters,
  showClearButton = false,
  exportActions = [],
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between w-full bg-card/40 backdrop-blur-xs p-3.5 rounded-xl border border-muted/80",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        {/* Caja de Búsqueda */}
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-8 bg-background dark:bg-zinc-900/60 hover:bg-slate-50/60 dark:hover:bg-zinc-900/80 border-input dark:border-zinc-800/80 text-xs rounded-lg shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-background"
          />
        </div>

        {/* Filtros Dinámicos */}
        {filters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={filter.value}
                onValueChange={filter.onChange}
              >
                <SelectTrigger className="h-8 bg-background dark:bg-zinc-900/60 hover:bg-slate-50/60 dark:hover:bg-zinc-900/80 border-input dark:border-zinc-800/80 text-xs w-full sm:w-[220px] cursor-pointer rounded-lg shadow-xs transition-colors">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {filter.options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            {/* Botón de Limpiar Filtros */}
            {showClearButton && onClearFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer rounded-lg px-2"
              >
                <X className="size-3.5" />
                Limpiar filtros
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Botones de Exportación / Acciones */}
      {exportActions.length > 0 && (
        <div className="flex items-center gap-2 self-end lg:self-auto">
          {exportActions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="h-8 gap-1.5 text-xs cursor-pointer rounded-lg bg-background dark:bg-zinc-900/60 hover:bg-slate-50/60 dark:hover:bg-zinc-900/80 border-input dark:border-zinc-800/80 shadow-xs transition-colors"
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
