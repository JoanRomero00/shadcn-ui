"use client"

import * as React from "react"
import { AlertTriangle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CrudDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  itemName: string
  onSubmit: () => Promise<void>
  submitLabel?: string
}

export function CrudDeleteDialog({
  isOpen,
  onClose,
  title,
  itemName,
  onSubmit,
  submitLabel = "Eliminar",
}: CrudDeleteDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
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
  }, [isOpen, onClose, isSubmitting])

  if (!isOpen) return null

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => {
        if (!isSubmitting) onClose()
      }}
    >
      <div
        className="relative max-w-md w-full mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border-0 dark:border dark:border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-destructive p-4 text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 shrink-0" />
            <span className="font-semibold text-lg">{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-white disabled:pointer-events-none"
          >
            <X className="size-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-3">
          <p className="text-sm text-foreground font-medium leading-relaxed">
            ¿Está seguro de que desea eliminar permanentemente este registro?
          </p>
          <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive-foreground">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Registro a eliminar
            </span>
            <span className="text-sm font-bold text-foreground mt-1 block truncate">
              {itemName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Esta acción no se puede deshacer y eliminará los datos asociados del servidor.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-muted/20">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg text-xs font-semibold px-4 py-2 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="font-semibold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Eliminando...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
