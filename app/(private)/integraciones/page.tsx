"use client"

import * as React from "react"
import { SiteHeader } from "@/components/site-header"
import { TableToolbar } from "@/components/table-toolbar"
import { StatusBadge } from "@/components/status-badge"
import { DetailsDialog, type IntegracionDetallada } from "@/components/details-dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  FileDown,
  Printer,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Eye,
  Edit,
  Trash,
} from "lucide-react"
import { toast } from "sonner"

// Base de datos de prueba ampliada a 25 registros para pruebas robustas de paginación
const integracionesMock: IntegracionDetallada[] = [
  {
    nroInte: "2026/041",
    fecha: "2026-06-22",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-02837482-3",
    nroExpe: "124/2026",
    caratula: "Romero Joan c/ Provincia de Santa Fe s/ Recurso de Inconstitucionalidad",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Integración ordinaria de la sala por sorteo informático reglamentario de vocales titulares.",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-22 09:45" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-06-22 10:30" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-06-22 11:15" },
    ],
    historial: [
      { fecha: "2026-06-21 08:30", accion: "Sorteo informático de vocales", usuario: "Sistema" },
      { fecha: "2026-06-21 11:15", accion: "Proyecto de resolución cargado", usuario: "Dr. Spuler" },
      { fecha: "2026-06-22 11:15", accion: "Firma registrada y resolución de sala emitida", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Acta de Sorteo Integración 2026-041.pdf", size: "1.2 MB" },
      { nombre: "Resolución de Sala Integrada - Romero.pdf", size: "840 KB" },
    ]
  },
  {
    nroInte: "2026/040",
    fecha: "2026-06-20",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-09483726-1",
    nroExpe: "89/2026",
    caratula: "Valdez Hugo s/ Quiebra Indirecta s/ Incidente de Apelación",
    tipo: "Integración por Excusa",
    estado: "Pendiente",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    motivo: "Excusación formal del Dr. Netri admitida por causales de vinculación comercial previa con la parte demandada.",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Pendiente" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-06-20 16:20" },
      { nombre: "Dr. Roberto Falistocco", firma: "Pendiente" },
    ],
    historial: [
      { fecha: "2026-06-20 09:10", accion: "Recepción de inhibición de vocal titular", usuario: "Secretaría Civil" },
      { fecha: "2026-06-20 10:45", accion: "Sorteo y designación de vocal subrogante", usuario: "Sistema" },
      { fecha: "2026-06-20 16:20", accion: "Notificación y firma del vocal subrogante", usuario: "Dra. Gastaldi" },
    ],
    documentos: [
      { nombre: "Presentación Excusación Dr. Netri.pdf", size: "450 KB" },
      { nombre: "Acta Sorteo Vocal Subrogante - Valdez.pdf", size: "980 KB" },
    ]
  },
  {
    nroInte: "2026/039",
    fecha: "2026-06-19",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-08473920-5",
    nroExpe: "204/2025",
    caratula: "Municipalidad de Santa Fe c/ Giménez Luis s/ Apremio Fiscal",
    tipo: "Integración de Sala",
    estado: "En Firma",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Falta de quórum de la sala civil provocado por licencia extraordinaria por razones de salud del Dr. Gutiérrez.",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-19 12:30" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Pendiente" },
      { nombre: "Dr. Daniel Erbetta", firma: "Pendiente" },
    ],
    historial: [
      { fecha: "2026-06-18 10:00", accion: "Carga de licencia extraordinaria de vocal titular", usuario: "Recursos Humanos" },
      { fecha: "2026-06-18 12:15", accion: "Sorteo de vocal subrogante", usuario: "Sistema" },
      { fecha: "2026-06-19 12:30", accion: "Firma digital del primer vocal", usuario: "Dr. Spuler" },
    ],
    documentos: [
      { nombre: "Resolución de Licencia Dr. Gutiérrez.pdf", size: "320 KB" },
      { nombre: "Acta Sorteo Reemplazo - Municipalidad c/ Giménez.pdf", size: "1.1 MB" },
    ]
  },
  {
    nroInte: "2026/038",
    fecha: "2026-06-18",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-03948572-8",
    nroExpe: "310/2025",
    caratula: "Fernández María c/ Nuevo Banco de Santa Fe s/ Daños y Perjuicios",
    tipo: "Integración por Recusación",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Recusación con causa deducida por la parte actora y declarada procedente por el tribunal ad-hoc.",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-06-18 14:15" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-06-18 15:00" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-18 15:45" },
    ],
    historial: [
      { fecha: "2026-06-17 11:30", accion: "Incidente de recusación admitido formalmente", usuario: "Tribunal Pleno" },
      { fecha: "2026-06-17 15:00", accion: "Sorteo de integración de vocales subrogantes", usuario: "Sistema" },
      { fecha: "2026-06-18 15:45", accion: "Cierre, registro de firmas y archivo de incidente", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Incidente de Recusación - Banco Santa Fe.pdf", size: "2.3 MB" },
      { nombre: "Acta Sorteo Sala III Integrada.pdf", size: "1.0 MB" },
    ]
  },
  {
    nroInte: "2026/037",
    fecha: "2026-06-15",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-01948374-2",
    nroExpe: "412/2025",
    caratula: "Gómez Alberto s/ Sucesión Ab Intestato s/ Apelación de Honorarios",
    tipo: "Integración de Sala",
    estado: "Error",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    motivo: "Falla de firmas: Error de comunicación de tokens de seguridad en el validador de firmas criptográficas.",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Pendiente" },
      { nombre: "Dr. Roberto Falistocco", firma: "Pendiente" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Pendiente" },
    ],
    historial: [
      { fecha: "2026-06-14 09:30", accion: "Orden de sorteo por vacancia de sala", usuario: "Secretaría Civil" },
      { fecha: "2026-06-14 10:15", accion: "Error crítico de firma: Inconsistencia criptográfica de token", usuario: "Sistema" },
      { fecha: "2026-06-15 08:30", accion: "Trámite retenido en mesa de soporte informático", usuario: "Informática" },
    ],
    documentos: [
      { nombre: "Informe Técnico - Falla de Validación de Firmas.pdf", size: "120 KB" },
    ]
  },
  {
    nroInte: "2026/036",
    fecha: "2026-06-12",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-07384950-9",
    nroExpe: "15/2026",
    caratula: "Sindicato de Luz y Fuerza c/ EPE s/ Amparo Colectivo",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Integración por vacante definitiva derivada de la jubilación ordinaria del Dr. Pérez.",
    vocales: [
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-06-12 10:30" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-12 11:00" },
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-06-12 11:45" },
    ],
    historial: [
      { fecha: "2026-06-11 08:00", accion: "Sorteo extraordinario de vocal subrogante permanente", usuario: "Sistema" },
      { fecha: "2026-06-12 11:45", accion: "Registro de firmas digitales y cierre de sorteo", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Acta Sorteo Reemplazo Permanente.pdf", size: "1.5 MB" },
      { nombre: "Firma Resolución Amparo Colectivo Luz y Fuerza.pdf", size: "900 KB" },
    ]
  },
  {
    nroInte: "2026/035",
    fecha: "2026-06-10",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-04938271-4",
    nroExpe: "180/2025",
    caratula: "Sosa Irma c/ Provincia de Santa Fe s/ Daños y Perjuicios",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Integración por sorteo ordinario ante excusación por conexidad de causas formulada por el Dr. Falistocco.",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-06-10 10:15" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-10 11:00" },
      { nombre: "Dr. Roberto Falistocco", firma: "Excusado" },
    ],
    historial: [
      { fecha: "2026-06-09 08:15", accion: "Excusación planteada por conexidad", usuario: "Dr. Falistocco" },
      { fecha: "2026-06-09 10:30", accion: "Sorteo de vocal subrogante ad-hoc", usuario: "Sistema" },
      { fecha: "2026-06-10 11:00", accion: "Firma de resolución y cierre de sorteo", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Acta Excusación Conexidad Falistocco.pdf", size: "380 KB" },
      { nombre: "Sorteo Sala III - Sosa c/ Provincia.pdf", size: "1.1 MB" },
    ]
  },
  {
    nroInte: "2026/034",
    fecha: "2026-06-08",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-08394810-2",
    nroExpe: "95/2026",
    caratula: "Banco de Santa Fe c/ Oliva Héctor s/ Ejecución Hipotecaria",
    tipo: "Integración por Excusa",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Inhibición voluntaria declarada por el Dr. Spuler por razones de decoro e imparcialidad.",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Excusado" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-06-08 14:00" },
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-06-08 14:45" },
    ],
    historial: [
      { fecha: "2026-06-07 09:00", accion: "Formulación de inhibición por decoro", usuario: "Dr. Spuler" },
      { fecha: "2026-06-07 13:10", accion: "Asignación automática de subrogancia", usuario: "Sistema" },
      { fecha: "2026-06-08 14:45", accion: "Registros e inserción de ejecuciones", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Declaración Inhibición Dr. Spuler.pdf", size: "290 KB" },
      { nombre: "Acta Asignación Ejecución Hipotecaria.pdf", size: "950 KB" },
    ]
  },
  {
    nroInte: "2026/033",
    fecha: "2026-06-05",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-02938475-7",
    nroExpe: "22/2026",
    caratula: "López Carlos c/ EPE s/ Daños y Perjuicios",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    motivo: "Integración reglamentaria de la sala por sorteo informático periódico de quórum.",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-06-05 09:15" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-06-05 10:00" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-06-05 11:30" },
    ],
    historial: [
      { fecha: "2026-06-04 10:00", accion: "Sorteo reglamentario de vocales titulares", usuario: "Sistema" },
      { fecha: "2026-06-05 11:30", accion: "Firmas registradas y sentencia homologada", usuario: "Mesa de Entradas" },
    ],
    documentos: [
      { nombre: "Acta Sorteo Sala II - López c/ EPE.pdf", size: "1.1 MB" },
    ]
  },
  {
    nroInte: "2026/032",
    fecha: "2026-06-02",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-04859203-1",
    nroExpe: "150/2025",
    caratula: "Martínez Stella c/ Caja de Jubilaciones s/ Recurso Contencioso Administrativo",
    tipo: "Integración por Recusación",
    estado: "Pendiente",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    motivo: "Recusación sin expresión de causa interpuesta legalmente por la representación judicial del Estado Provincial.",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Pendiente" },
      { nombre: "Dr. Roberto Falistocco", firma: "Pendiente" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-06-02 16:30" },
    ],
    historial: [
      { fecha: "2026-06-01 11:00", accion: "Interposición de recusación sin expresión de causa", usuario: "Fiscalía de Estado" },
      { fecha: "2026-06-02 09:30", accion: "Sorteo del tribunal de reemplazo ad-hoc", usuario: "Sistema" },
      { fecha: "2026-06-02 16:30", accion: "Validación digital de integración de vocalía", usuario: "Dr. Spuler" },
    ],
    documentos: [
      { nombre: "Recusación Sin Causa - Martínez Stella.pdf", size: "750 KB" },
      { nombre: "Acta Sorteo Integrantes ad-hoc Sala III.pdf", size: "900 KB" },
    ]
  },
  // --- Nuevos registros agregados para probar la paginación ---
  {
    nroInte: "2026/031",
    fecha: "2026-05-30",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-09473820-1",
    nroExpe: "12/2026",
    caratula: "Zabala Pedro c/ Provincia de Santa Fe s/ Recurso Contencioso Administrativo",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-30 11:00" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-30 11:30" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-30 12:00" }
    ],
    historial: [
      { fecha: "2026-05-29 09:00", accion: "Sorteo automático", usuario: "Sistema" }
    ],
    documentos: [{ nombre: "Acta de Sorteo 2026-031.pdf", size: "650 KB" }]
  },
  {
    nroInte: "2026/030",
    fecha: "2026-05-28",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-03948572-1",
    nroExpe: "210/2025",
    caratula: "Giménez María c/ EPE s/ Amparo de Salud urgente",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-05-28 15:30" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-28 16:00" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-28 16:30" }
    ],
    historial: [
      { fecha: "2026-05-28 08:30", accion: "Inicio trámite habilitación de firmas", usuario: "Mesa Civil" }
    ],
    documentos: [{ nombre: "Sentencia Homologada Gimenez.pdf", size: "1.4 MB" }]
  },
  {
    nroInte: "2026/029",
    fecha: "2026-05-25",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-07483920-3",
    nroExpe: "115/2025",
    caratula: "Banco Central de la República Argentina c/ Cooperativa Lehmann s/ Ejecución Ejecutiva",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-25 10:15" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-25 10:45" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-25 11:15" }
    ],
    historial: [{ fecha: "2026-05-24 14:00", accion: "Sorteo y asignación de sala", usuario: "Sistema" }],
    documentos: [{ nombre: "Acta Sorteo Lehmann.pdf", size: "890 KB" }]
  },
  {
    nroInte: "2026/028",
    fecha: "2026-05-22",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-01928374-5",
    nroExpe: "44/2026",
    caratula: "Vázquez Ariel c/ Nuevo Banco de Santa Fe s/ Daños y Perjuicios contractuales",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-22 09:30" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-22 10:00" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-22 10:30" }
    ],
    historial: [{ fecha: "2026-05-21 08:30", accion: "Ingreso de demanda digitalizada", usuario: "Operador Civil" }],
    documentos: [{ nombre: "Demanda Vázquez c Banco.pdf", size: "3.2 MB" }]
  },
  {
    nroInte: "2026/027",
    fecha: "2026-05-20",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-02948374-8",
    nroExpe: "302/2025",
    caratula: "Suárez Juan s/ Concurso Preventivo s/ Incidente de Verificación de Crédito",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-05-20 14:15" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-20 15:00" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-20 15:45" }
    ],
    historial: [{ fecha: "2026-05-19 12:00", accion: "Sorteo informático de vocales", usuario: "Sistema" }],
    documentos: [{ nombre: "Verificacion de Credito Incidente.pdf", size: "1.7 MB" }]
  },
  {
    nroInte: "2026/026",
    fecha: "2026-05-18",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-03948271-9",
    nroExpe: "105/2026",
    caratula: "Pérez Norma c/ Caja de Previsión Social s/ Jubilaciones y Pensiones",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-18 11:30" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-18 12:00" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-18 12:30" }
    ],
    historial: [{ fecha: "2026-05-17 11:00", accion: "Sorteo ordinario de expedientes de jubilación", usuario: "Sistema" }],
    documentos: [{ nombre: "Acta Sorteo Perez Norma.pdf", size: "710 KB" }]
  },
  {
    nroInte: "2026/025",
    fecha: "2026-05-15",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-08374920-4",
    nroExpe: "76/2026",
    caratula: "Herrera Carlos c/ Telecom Argentina s/ Ley de Defensa del Consumidor",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-15 09:10" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-15 10:15" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-15 10:45" }
    ],
    historial: [{ fecha: "2026-05-14 08:30", accion: "Recepción de expediente civil", usuario: "Mesa Civil" }],
    documentos: [{ nombre: "Demanda Ley Defensa Consumidor.pdf", size: "1.9 MB" }]
  },
  {
    nroInte: "2026/024",
    fecha: "2026-05-12",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-07384910-3",
    nroExpe: "190/2025",
    caratula: "Mendoza Laura c/ Sanatorio Santa Fe s/ Mala Praxis Médica",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-05-12 16:00" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-12 16:30" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-12 17:00" }
    ],
    historial: [{ fecha: "2026-05-11 11:45", accion: "Sorteo e integración ordinaria", usuario: "Sistema" }],
    documentos: [{ nombre: "Mala Praxis Sanatorio SF.pdf", size: "2.8 MB" }]
  },
  {
    nroInte: "2026/023",
    fecha: "2026-05-10",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-02938481-2",
    nroExpe: "220/2025",
    caratula: "Torres Andrés c/ Aseguradora Litoral s/ Cumplimiento de Contrato comercial",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-10 11:30" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-10 12:00" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-10 12:45" }
    ],
    historial: [{ fecha: "2026-05-09 10:15", accion: "Ingreso apelación por aseguradora", usuario: "Operador Civil" }],
    documentos: [{ nombre: "Recurso Apelacion Aseguradora.pdf", size: "990 KB" }]
  },
  {
    nroInte: "2026/022",
    fecha: "2026-05-08",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-01938472-6",
    nroExpe: "110/2026",
    caratula: "Ramírez Héctor s/ Sucesión testamentaria",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-08 14:15" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-08 14:45" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-08 15:30" }
    ],
    historial: [{ fecha: "2026-05-07 09:30", accion: "Sorteo y resolución ordinaria", usuario: "Sistema" }],
    documentos: [{ nombre: "Testamento Ramirez.pdf", size: "1.1 MB" }]
  },
  {
    nroInte: "2026/021",
    fecha: "2026-05-05",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-03948210-4",
    nroExpe: "5/2026",
    caratula: "Castro Mónica c/ Municipalidad de Santo Tomé s/ Amparo Colectivo Ambiental",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-05-05 10:00" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-05 10:30" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-05-05 11:15" }
    ],
    historial: [{ fecha: "2026-05-04 11:30", accion: "Sorteo extraordinario amparos", usuario: "Sistema" }],
    documentos: [{ nombre: "Amparo Colectivo Ambiental Castro.pdf", size: "2.4 MB" }]
  },
  {
    nroInte: "2026/020",
    fecha: "2026-05-02",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-07493820-8",
    nroExpe: "145/2025",
    caratula: "Alvarez Jorge c/ Litoral Gas s/ Daños y Perjuicios por falta de servicio",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-05-02 14:15" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-05-02 14:45" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-05-02 15:30" }
    ],
    historial: [{ fecha: "2026-05-01 10:45", accion: "Ingreso incidente de apelacion de pericias", usuario: "Mesa Civil" }],
    documentos: [{ nombre: "Resolucion Pericial Gas.pdf", size: "620 KB" }]
  },
  {
    nroInte: "2026/019",
    fecha: "2026-04-28",
    sala: "Sala I - Civil y Comercial",
    cuijExpe: "21-08394820-9",
    nroExpe: "80/2026",
    caratula: "Bustamante Silvia c/ Provincia de Santa Fe s/ Contencioso Administrativo por haberes",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-04-28 11:30" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-04-28 12:00" },
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-04-28 12:30" }
    ],
    historial: [{ fecha: "2026-04-27 08:30", accion: "Sorteo ordinario mensual", usuario: "Sistema" }],
    documentos: [{ nombre: "Recurso Haberes Bustamante.pdf", size: "1.5 MB" }]
  },
  {
    nroInte: "2026/018",
    fecha: "2026-04-25",
    sala: "Sala II - Civil y Comercial",
    cuijExpe: "21-02938410-5",
    nroExpe: "410/2025",
    caratula: "Peralta Luis c/ Cervecería Santa Fe s/ Cobro de Pesos laboral",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dr. Juan Manuel Romero",
    vocales: [
      { nombre: "Dr. Daniel Erbetta", firma: "Completada", fechaFirma: "2026-04-25 15:45" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-04-25 16:15" },
      { nombre: "Dra. María Angélica Gastaldi", firma: "Completada", fechaFirma: "2026-04-25 16:45" }
    ],
    historial: [{ fecha: "2026-04-24 10:15", accion: "Registro sorteo ordinario", usuario: "Sistema" }],
    documentos: [{ nombre: "Acuerdo Transaccional Peralta.pdf", size: "850 KB" }]
  },
  {
    nroInte: "2026/017",
    fecha: "2026-04-22",
    sala: "Sala III - Civil y Comercial",
    cuijExpe: "21-04958201-3",
    nroExpe: "135/2025",
    caratula: "Gómez Raúl c/ Caja Forense s/ Jubilación de Abogados recurso contencioso",
    tipo: "Integración de Sala",
    estado: "Completado",
    circunscripcion: "Circunscripción Nro 1 - Santa Fe",
    secretario: "Dra. Claudia de la Vega",
    vocales: [
      { nombre: "Dr. Rafael Gutiérrez", firma: "Completada", fechaFirma: "2026-04-22 10:00" },
      { nombre: "Dr. Eduardo Spuler", firma: "Completada", fechaFirma: "2026-04-22 10:30" },
      { nombre: "Dr. Roberto Falistocco", firma: "Completada", fechaFirma: "2026-04-22 11:00" }
    ],
    historial: [{ fecha: "2026-04-21 11:30", accion: "Inicio trámite apelación previsional", usuario: "Operador Civil" }],
    documentos: [{ nombre: "Demanda previsional abogados Forense.pdf", size: "2.1 MB" }]
  }
]

export default function IntegracionesPage() {
  // Estados para búsqueda y filtrado dinámico
  const [searchTerm, setSearchTerm] = React.useState("")
  const [presidenciaFilter, setPresidenciaFilter] = React.useState("camara-civil")
  const [anioFilter, setAnioFilter] = React.useState("todos")

  // Estados para paginación interactiva (10 filas por defecto, ajustado para evitar scroll y espacios vacíos)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  // Estados para el Modal de Detalle
  const [selectedItem, setSelectedItem] = React.useState<IntegracionDetallada | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  // Reiniciar a la página 1 cuando cambian los filtros o la búsqueda
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, presidenciaFilter, anioFilter])

  // Handlers para abrir el modal
  const handleOpenDetails = (item: IntegracionDetallada) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  // Limpiar filtros activos
  const handleClearFilters = () => {
    setSearchTerm("")
    setPresidenciaFilter("camara-civil")
    setAnioFilter("todos")
    setCurrentPage(1)
    toast.info("Filtros restablecidos")
  }

  const showClearButton =
    searchTerm !== "" || presidenciaFilter !== "camara-civil" || anioFilter !== "todos"

  // Lógica de filtrado en el cliente
  const filteredData = React.useMemo(() => {
    return integracionesMock.filter((item) => {
      // Filtrar por Presidencia seleccionada
      const matchesPresidencia =
        presidenciaFilter === "camara-civil"
          ? item.sala.toLowerCase().includes("civil")
          : presidenciaFilter === "camara-penal"
          ? item.sala.toLowerCase().includes("penal")
          : presidenciaFilter === "camara-laboral"
          ? item.sala.toLowerCase().includes("laboral")
          : true

      // Filtrar por año
      const matchesAnio =
        anioFilter === "todos" ? true : item.fecha.startsWith(anioFilter)

      // Filtrar por texto de búsqueda (CUIJ, carátula, nro integración o nro expediente)
      const query = searchTerm.toLowerCase().trim()
      const matchesSearch =
        query === ""
          ? true
          : item.cuijExpe.toLowerCase().includes(query) ||
            item.caratula.toLowerCase().includes(query) ||
            item.nroInte.toLowerCase().includes(query) ||
            item.nroExpe.toLowerCase().includes(query)

      return matchesPresidencia && matchesAnio && matchesSearch
    })
  }, [searchTerm, presidenciaFilter, anioFilter])

  // Datos paginados según la página activa y el tamaño de página
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize

  // Configuración de los selectores para la barra de herramientas
  const toolbarFilters = [
    {
      key: "presidencia",
      value: presidenciaFilter,
      placeholder: "Presidencia",
      options: [
        {
          label: "Cámara Civil y Comercial",
          value: "camara-civil",
        },
        {
          label: "Cámara en lo Penal",
          value: "camara-penal",
        },
        {
          label: "Cámara de Distrito Laboral",
          value: "camara-laboral",
        },
      ],
      onChange: setPresidenciaFilter,
    },
    {
      key: "anio",
      value: anioFilter,
      placeholder: "Año",
      options: [
        { label: "Todos los años", value: "todos" },
        { label: "2026", value: "2026" },
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
      ],
      onChange: setAnioFilter,
    },
  ]

  // Configuración de los botones de exportación
  const exportActions = [
    {
      label: "CSV",
      icon: <FileDown className="size-3.5" />,
      onClick: () => toast.success("Exportando tabla a formato CSV..."),
    },
    {
      label: "PDF",
      icon: <FileText className="size-3.5" />,
      onClick: () => toast.success("Exportando tabla a formato PDF..."),
    },
    {
      label: "Imprimir",
      icon: <Printer className="size-3.5" />,
      onClick: () => window.print(),
    },
  ]

  return (
    <>
      {/* Barra superior: Título e Identidad unificada con botón primario de acción en el extremo derecho */}
      <SiteHeader
        title="Integraciones"
        action={
          <Button
            onClick={() =>
              toast.info("Formulario de creación de integraciones en desarrollo.")
            }
            className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 rounded-lg px-3 h-8 text-xs font-semibold"
          >
            <Plus className="size-3.5" />
            Nueva Integración
          </Button>
        }
      />

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6 max-w-[1600px] w-full mx-auto overflow-hidden">
        {/* Barra de Herramientas Inteligente y Compacta */}
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por CUIJ, carátula o nro. integración..."
          filters={toolbarFilters}
          showClearButton={showClearButton}
          onClearFilters={handleClearFilters}
          exportActions={exportActions}
        />

        {/* Tabla Principal con altura auto-ajustable a la cantidad de filas exactas (sin espacio blanco) */}
        <div className="max-h-full flex flex-col min-h-0 rounded-xl border border-muted bg-card overflow-hidden shadow-xs w-full">
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-primary [&_th]:text-primary-foreground dark:bg-card/95 dark:[&_th]:text-primary sticky top-0 z-10 border-b border-muted">
                <TableRow className="hover:bg-transparent border-b border-muted/80">
                  <TableHead className="pl-4 md:pl-6 w-[110px] font-bold text-xs uppercase tracking-wider h-9">
                    Nro Inte.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-xs uppercase tracking-wider h-9">
                    Fecha
                  </TableHead>
                  <TableHead className="w-[180px] font-bold text-xs uppercase tracking-wider h-9">
                    Sala
                  </TableHead>
                  <TableHead className="w-[130px] font-bold text-xs uppercase tracking-wider h-9">
                    CUIJ Expe.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-xs uppercase tracking-wider h-9">
                    Nro Expe.
                  </TableHead>
                  <TableHead className="min-w-[280px] font-bold text-xs uppercase tracking-wider h-9">
                    Carátula
                  </TableHead>
                  <TableHead className="w-[160px] font-bold text-xs uppercase tracking-wider h-9">
                    Tipo
                  </TableHead>
                  <TableHead className="w-[110px] font-bold text-xs uppercase tracking-wider h-9">
                    Estado
                  </TableHead>
                  <TableHead className="pr-4 md:pr-6 w-[60px] text-right font-bold text-xs uppercase tracking-wider h-9">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow
                      key={item.nroInte}
                      onClick={() => handleOpenDetails(item)}
                      className="hover:bg-muted/30 dark:hover:bg-primary/5 transition-colors cursor-pointer border-b border-muted/60 dark:border-muted/30 last:border-0"
                    >
                      <TableCell className="pl-4 md:pl-6 font-semibold text-xs py-2 text-foreground">
                        {item.nroInte}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2">
                        {item.fecha}
                      </TableCell>
                      <TableCell className="text-xs font-semibold py-2">
                        {item.sala}
                      </TableCell>
                      <TableCell className="text-xs font-mono font-medium py-2 text-muted-foreground">
                        {item.cuijExpe}
                      </TableCell>
                      <TableCell className="text-xs font-medium py-2">
                        {item.nroExpe}
                      </TableCell>
                      <TableCell
                        className="text-xs font-medium py-2 max-w-sm truncate"
                        title={item.caratula}
                      >
                        {item.caratula}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-2">
                        {item.tipo}
                      </TableCell>
                      <TableCell className="py-2" onClick={(e) => e.stopPropagation()}>
                        <StatusBadge status={item.estado} />
                      </TableCell>
                      <TableCell className="pr-4 md:pr-6 text-right py-2" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="size-7 cursor-pointer hover:bg-muted/80 rounded-md"
                            >
                              <MoreHorizontal className="size-4 text-muted-foreground" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px] rounded-lg">
                            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">
                              Operaciones
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-xs"
                              onClick={() => handleOpenDetails(item)}
                            >
                              <Eye className="size-3.5 text-muted-foreground" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-xs"
                              onClick={() =>
                                toast.success(
                                  `Descargando acta de sorteo para ${item.nroInte}...`
                                )
                              }
                            >
                              <FileText className="size-3.5 text-muted-foreground" />
                              Descargar Acta
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-xs"
                              onClick={() =>
                                toast.info(
                                  "Edición de registros inhabilitada para el perfil operador."
                                )
                              }
                            >
                              <Edit className="size-3.5 text-muted-foreground" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-xs text-red-650 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                              onClick={() =>
                                toast.error("No cuenta con permisos para eliminar registros.")
                              }
                            >
                              <Trash className="size-3.5" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center text-xs text-muted-foreground">
                      No se encontraron integraciones con los filtros seleccionados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer de Paginación Interactivo (Muestra 10 registros por defecto sin espacio blanco en la tarjeta) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-muted bg-muted/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mostrar</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(val) => {
                  setPageSize(Number(val))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-16 h-8 bg-background border-muted/80 cursor-pointer rounded-lg text-xs">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="10" className="text-xs cursor-pointer">10</SelectItem>
                  <SelectItem value="25" className="text-xs cursor-pointer">25</SelectItem>
                  <SelectItem value="50" className="text-xs cursor-pointer">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">registros</span>
            </div>

            <div className="text-muted-foreground font-medium">
              Mostrando registros del{" "}
              <span className="font-bold text-foreground">
                {filteredData.length > 0 ? startIndex + 1 : 0}
              </span>{" "}
              al{" "}
              <span className="font-bold text-foreground">
                {Math.min(startIndex + pageSize, filteredData.length)}
              </span>{" "}
              de un total de{" "}
              <span className="font-bold text-foreground">
                {filteredData.length}
              </span>{" "}
              registros
            </div>

            <div className="flex items-center gap-1">
              {/* Primer Página */}
              <Button
                variant="outline"
                size="icon"
                className="size-8 cursor-pointer rounded-lg"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="size-4" />
                <span className="sr-only">Primera página</span>
              </Button>
              {/* Página Anterior */}
              <Button
                variant="outline"
                size="icon"
                className="size-8 cursor-pointer rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">Página anterior</span>
              </Button>

              {/* Páginas Numéricas */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                const isActive = currentPage === pageNum
                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    size="icon"
                    className={`size-8 cursor-pointer rounded-lg font-semibold ${
                      isActive ? "bg-primary text-primary-foreground hover:bg-primary/95" : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              {/* Página Siguiente */}
              <Button
                variant="outline"
                size="icon"
                className="size-8 cursor-pointer rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-4" />
                <span className="sr-only">Página siguiente</span>
              </Button>
              {/* Última Página */}
              <Button
                variant="outline"
                size="icon"
                className="size-8 cursor-pointer rounded-lg"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="size-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Centrado de Detalle */}
      <DetailsDialog
        integracion={selectedItem}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  )
}
