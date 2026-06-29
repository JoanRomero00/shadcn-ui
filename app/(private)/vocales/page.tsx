import { SiteHeader } from "@/components/layout/site-header"
import { Users } from "lucide-react"

export const metadata = {
  title: "Vocales - Poder Judicial",
}

export default function VocalesPage() {
  return (
    <>
      <SiteHeader title="Vocales" />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
          <Users className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Módulo de Vocales</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Sección en desarrollo. Aquí se gestionará la nómina de vocales, sus asignaciones de salas y deliberaciones activas.
        </p>
      </div>
    </>
  )
}
