"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/table/status-badge"

export interface CrudDetailField {
  name: string
  label: string
  type?: "text" | "number" | "email" | "select" | "status"
}

interface CrudDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  fields: CrudDetailField[]
  data: any
}

export function CrudDetailDialog({
  isOpen,
  onClose,
  title,
  fields,
  data,
}: CrudDetailDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen || !data) return null

  const renderValue = (field: CrudDetailField) => {
    const val = data[field.name]
    if (val === undefined || val === null || val === "") {
      return <span className="text-muted-foreground italic text-xs">Sin dato</span>
    }

    if (field.name === "estado" || field.type === "status") {
      return <StatusBadge status={val} />
    }

    if (field.type === "email") {
      return (
        <a href={`mailto:${val}`} className="text-xs font-mono hover:underline text-[#104b45] dark:text-[#2dd4bf] break-all">
          {val}
        </a>
      )
    }

    return <span className="text-sm font-medium text-foreground">{val}</span>
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border-0 dark:border dark:border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#104b45] p-4 text-white">
          <span className="font-semibold text-lg">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-white"
          >
            <X className="size-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {/* Always display ID first */}
          <div className="flex flex-col gap-1 border-b pb-3 border-border/60">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ID Registro
            </span>
            <span className="font-mono text-sm font-bold text-[#104b45] dark:text-[#2dd4bf]">
              #{data.id}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1 border-b pb-3 border-border/60 last:border-0 last:pb-0">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {field.label}
                </span>
                <div className="mt-0.5">{renderValue(field)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t bg-muted/20">
          <Button
            onClick={onClose}
            className="bg-[#104b45] hover:bg-[#104b45]/95 text-white font-semibold px-5 py-2 rounded-lg text-xs transition-all cursor-pointer"
          >
            Cerrar Detalle
          </Button>
        </div>
      </div>
    </div>
  )
}
