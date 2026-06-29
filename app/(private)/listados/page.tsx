import { SiteHeader } from "@/components/layout/site-header"
import { List } from "lucide-react"

export const metadata = {
  title: "Listados - Poder Judicial",
}

export default function ListadosPage() {
  return (
    <>
      <SiteHeader title="Listados" />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
          <List className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Módulo de Listados</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Sección en desarrollo. Reportes dinámicos de causas, estadísticas de resoluciones y listados de sorteos del Poder Judicial.
        </p>
      </div>
    </>
  )
}
