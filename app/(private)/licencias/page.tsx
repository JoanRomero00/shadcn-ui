import { SiteHeader } from "@/components/site-header"
import { FileCheck } from "lucide-react"

export const metadata = {
  title: "Licencias - Poder Judicial",
}

export default function LicenciasPage() {
  return (
    <>
      <SiteHeader title="Licencias" />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
          <FileCheck className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Módulo de Licencias</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Sección en desarrollo. Aquí se podrá administrar las licencias ordinarias y extraordinarias solicitadas por el personal judicial y vocales.
        </p>
      </div>
    </>
  )
}
