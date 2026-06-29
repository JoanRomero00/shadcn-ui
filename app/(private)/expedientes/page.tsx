import { SiteHeader } from "@/components/site-header"
import { Folder } from "lucide-react"

export const metadata = {
  title: "Expedientes - Poder Judicial",
}

export default function ExpedientesPage() {
  return (
    <>
      <SiteHeader title="Expedientes" />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
          <Folder className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Módulo de Expedientes</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Sección en desarrollo. Acceso al registro histórico e indexador inteligente de expedientes de las distintas circunscripciones.
        </p>
      </div>
    </>
  )
}
