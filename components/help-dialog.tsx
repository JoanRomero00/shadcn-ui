"use client"

import * as React from "react"
import { HelpCircle, Mail, X } from "lucide-react"

interface HelpDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
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
        className="relative max-w-md w-full mx-4 bg-background rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#104b45] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1.5 rounded-full bg-white/10">
              <HelpCircle className="size-5" />
            </div>
            <span className="font-semibold text-lg">Ayuda</span>
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
            Si tiene alguna duda, inconveniente técnico o consulta sobre la información visualizada en este panel, por favor comuníquese enviando un correo electrónico a:
          </p>
          
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400">
              <Mail className="size-4" />
            </div>
            <a 
              href="mailto:ayudalegajoros@justiciasantafe.gov.ar?subject=Consulta%20-%20Sistema%20de%20Integraciones" 
              className="text-sm font-medium hover:underline text-foreground"
            >
              ayudalegajoros@justiciasantafe.gov.ar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
