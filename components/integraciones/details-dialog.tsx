import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/table/status-badge"
import { toast } from "sonner"
import {
  Copy,
  FileDown,
  FileText,
  User,
  MapPin,
  Scale,
  Calendar,
  Layers,
} from "lucide-react"

export interface IntegracionDetallada {
  nroInte: string
  fecha: string
  sala: string
  cuijExpe: string
  nroExpe: string
  caratula: string
  tipo: string
  estado: string
  circunscripcion?: string
  secretario?: string
  motivo?: string
  vocales?: {
    nombre: string
    firma: "Completada" | "Pendiente" | "Excusado"
    fechaFirma?: string
  }[]
  historial?: {
    fecha: string
    accion: string
    usuario: string
  }[]
  documentos?: {
    nombre: string
    size: string
  }[]
}

interface DetailsDialogProps {
  integracion: IntegracionDetallada | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DetailsDialog({
  integracion,
  open,
  onOpenChange,
}: DetailsDialogProps) {
  if (!integracion) return null

  const handleCopyCUIJ = (cuij: string) => {
    navigator.clipboard.writeText(cuij)
    toast.success("CUIJ copiado al portapapeles")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col gap-4 overflow-hidden rounded-xl border border-muted/80">
        <DialogHeader className="border-b pb-3.5 flex flex-col gap-1.5 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <DialogTitle className="text-base font-bold text-foreground">
              Integración {integracion.nroInte}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <StatusBadge status={integracion.estado} />
            </div>
          </div>
          <DialogDescription className="text-xs text-muted-foreground text-left line-clamp-2">
            Expediente Nro {integracion.nroExpe} - {integracion.caratula}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1 py-1">
          <Tabs defaultValue="info" className="w-full flex flex-col gap-4">
            <TabsList className="grid w-full grid-cols-3 bg-muted/65 rounded-lg p-1 shrink-0">
              <TabsTrigger
                value="info"
                className="text-xs font-semibold py-1.5 cursor-pointer rounded-md"
              >
                Información
              </TabsTrigger>
              <TabsTrigger
                value="signatures"
                className="text-xs font-semibold py-1.5 cursor-pointer rounded-md"
              >
                Firmas y Historial
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-xs font-semibold py-1.5 cursor-pointer rounded-md"
              >
                Documentos
              </TabsTrigger>
            </TabsList>

            {/* Pestaña: Información */}
            <TabsContent value="info" className="mt-0 focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* CUIJ con botón de copiar */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-between p-3.5 rounded-lg border bg-muted/20 border-muted">
                  <div className="flex items-center gap-2.5">
                    <Layers className="size-4.5 text-muted-foreground" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        CUIJ Expediente
                      </span>
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {integracion.cuijExpe}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleCopyCUIJ(integracion.cuijExpe)}
                    className="hover:bg-muted/80 rounded-md cursor-pointer"
                  >
                    <Copy className="size-3.5 text-muted-foreground" />
                    <span className="sr-only">Copiar CUIJ</span>
                  </Button>
                </div>

                <div className="p-3 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <Scale className="size-3" /> Sala
                  </span>
                  <span className="text-xs font-semibold">{integracion.sala}</span>
                </div>

                <div className="p-3 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <Calendar className="size-3" /> Fecha de Sorteo
                  </span>
                  <span className="text-xs font-semibold">{integracion.fecha}</span>
                </div>

                <div className="p-3 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <MapPin className="size-3" /> Circunscripción
                  </span>
                  <span className="text-xs font-semibold">
                    {integracion.circunscripcion || "Circunscripción Nro 1 - Santa Fe"}
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                    <User className="size-3" /> Secretario de Sala
                  </span>
                  <span className="text-xs font-semibold">
                    {integracion.secretario || "Dra. Claudia de la Vega"}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-2 p-3.5 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">
                    Carátula
                  </span>
                  <span className="text-xs font-medium text-foreground leading-relaxed">
                    {integracion.caratula}
                  </span>
                </div>

                <div className="col-span-1 md:col-span-2 p-3.5 rounded-lg border border-muted bg-muted/10 flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">
                    Motivo de Integración
                  </span>
                  <span className="text-xs font-medium text-foreground leading-relaxed">
                    {integracion.motivo || "Integración automática por designación de sorteo judicial."}
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* Pestaña: Firmas y Flujo */}
            <TabsContent value="signatures" className="mt-0 focus-visible:outline-none">
              <div className="flex flex-col gap-4">
                {/* Firmas Vocales */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Firmas de Vocales de la Sala
                  </h4>
                  <div className="flex flex-col gap-2">
                    {integracion.vocales?.map((vocal, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-muted/80 bg-card/45"
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-6.5 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground">
                            {vocal.nombre.charAt(0) + (vocal.nombre.includes(" ") ? vocal.nombre.split(" ")[1].charAt(0) : "")}
                          </div>
                          <span className="text-xs font-semibold text-foreground">
                            {vocal.nombre}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          {vocal.fechaFirma && (
                            <span className="text-[10px] text-muted-foreground">
                              {vocal.fechaFirma}
                            </span>
                          )}
                          <StatusBadge status={vocal.firma} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historial */}
                <div className="flex flex-col gap-2 mt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Historial del Trámite Judicial
                  </h4>
                  <div className="flex flex-col border-l border-muted/80 ml-3.5 pl-4 gap-4.5 relative py-1.5">
                    {integracion.historial?.map((event, idx) => (
                      <div key={idx} className="relative flex flex-col gap-1">
                        <span className="absolute -left-[21px] top-1.5 flex size-2 bg-primary rounded-full border border-background"></span>
                        <span className="text-[9px] text-muted-foreground font-mono">
                          {event.fecha}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {event.accion}
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          Operador: {event.usuario}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Pestaña: Documentos */}
            <TabsContent value="documents" className="mt-0 focus-visible:outline-none">
              <div className="flex flex-col gap-2.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Expediente y Actas Firmadas
                </h4>
                <div className="flex flex-col gap-2">
                  {integracion.documentos?.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-muted/80 bg-card/45 hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="size-5 text-red-500/80" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground">
                            {doc.nombre}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {doc.size}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => toast.success(`Descargando ${doc.nombre}...`)}
                        className="size-8 rounded-lg cursor-pointer hover:bg-muted"
                      >
                        <FileDown className="size-4 text-muted-foreground" />
                        <span className="sr-only">Descargar</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="border-t pt-3 flex justify-end shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-xs cursor-pointer rounded-lg px-4"
          >
            Cerrar Ficha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
