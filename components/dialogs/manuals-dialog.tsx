"use client"

import * as React from "react"
import { BookOpen, Download, FileText, Settings, X } from "lucide-react"

interface ManualsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ManualsDialog({ isOpen, onClose }: ManualsDialogProps) {
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

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full mx-4 bg-card rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#104b45] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1.5 rounded-full bg-white/10">
              <BookOpen className="size-5" />
            </div>
            <span className="font-semibold text-lg">Manuales del Sistema</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-white"
          >
            <X className="size-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Seleccione el manual que desea descargar para ver la documentación oficial:
          </p>
          
          <div className="flex flex-col gap-3">
            {/* Manual de Usuario */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center size-9 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">Manual de Usuario</span>
                  <span className="text-xs text-muted-foreground truncate">Para operadores y consultas generales</span>
                </div>
              </div>
              <a 
                href="/manual-usuario.pdf" 
                download
                className="flex items-center justify-center size-8 rounded-lg bg-[#104b45] text-white hover:bg-[#104b45]/90 transition-all shrink-0 cursor-pointer shadow-xs ml-3"
                title="Descargar Manual de Usuario"
              >
                <Download className="size-4" />
              </a>
            </div>

            {/* Manual de Administrador */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center size-9 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 shrink-0">
                  <Settings className="size-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">Manual de Administrador</span>
                  <span className="text-xs text-muted-foreground truncate">Gestión de usuarios y configuraciones</span>
                </div>
              </div>
              <a 
                href="/manual-administrador.pdf" 
                download
                className="flex items-center justify-center size-8 rounded-lg bg-[#104b45] text-white hover:bg-[#104b45]/90 transition-all shrink-0 cursor-pointer shadow-xs ml-3"
                title="Descargar Manual de Administrador"
              >
                <Download className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
