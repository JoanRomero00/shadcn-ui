import { SiteHeader } from "@/components/site-header"
import { HelpCircle } from "lucide-react"

export const metadata = {
  title: "Soporte - Poder Judicial",
}

export default function AyudaPage() {
  return (
    <>
      <SiteHeader title="Ayuda y Soporte" />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
          <HelpCircle className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Ayuda y Soporte</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Sección en desarrollo. Soporte técnico en línea para incidencias, consultas de sorteo y asistencia al usuario.
        </p>
      </div>
    </>
  )
}
