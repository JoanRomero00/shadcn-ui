"use client"

import * as React from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { TableToolbar } from "@/components/table/table-toolbar"
import { StatusBadge } from "@/components/table/status-badge"
import { DetailsDialog, type IntegracionDetallada } from "@/components/integraciones/details-dialog"
import { DataTable } from "@/components/table/data-table"
import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  FileDown,
  Printer,
  MoreHorizontal,
  FileText,
  Eye,
  Edit,
  Trash,
} from "lucide-react"
import { toast } from "sonner"
import { integracionesMock } from "@/lib/mocks/integraciones"

export default function IntegracionesPage() {
  // Estados para búsqueda y filtrado dinámico
  const [searchTerm, setSearchTerm] = React.useState("")
  const [presidenciaFilter, setPresidenciaFilter] = React.useState("camara-civil")
  const [anioFilter, setAnioFilter] = React.useState("todos")

  // Estados para el Modal de Detalle
  const [selectedItem, setSelectedItem] = React.useState<IntegracionDetallada | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

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

  // Configuración de las columnas de la tabla genérica
  const columns = React.useMemo<ColumnDef<IntegracionDetallada>[]>(
    () => [
      {
        accessorKey: "nroInte",
        header: "Nro Inte.",
        size: 110,
        cell: ({ row }) => (
          <span className="font-semibold text-xs text-foreground">
            {row.getValue("nroInte")}
          </span>
        ),
      },
      {
        accessorKey: "fecha",
        header: "Fecha",
        size: 100,
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.getValue("fecha")}
          </span>
        ),
      },
      {
        accessorKey: "sala",
        header: "Sala",
        size: 180,
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground">
            {row.getValue("sala")}
          </span>
        ),
      },
      {
        accessorKey: "cuijExpe",
        header: "CUIJ Expe.",
        size: 130,
        cell: ({ row }) => (
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {row.getValue("cuijExpe")}
          </span>
        ),
      },
      {
        accessorKey: "nroExpe",
        header: "Nro Expe.",
        size: 100,
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground">
            {row.getValue("nroExpe")}
          </span>
        ),
      },
      {
        accessorKey: "caratula",
        header: "Carátula",
        cell: ({ row }) => (
          <span
            className="text-xs font-medium max-w-sm truncate block text-foreground"
            title={row.getValue("caratula")}
          >
            {row.getValue("caratula")}
          </span>
        ),
      },
      {
        accessorKey: "tipo",
        header: "Tipo",
        size: 160,
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground text-foreground">
            {row.getValue("tipo")}
          </span>
        ),
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 110,
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <StatusBadge status={row.getValue("estado")} />
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right w-full">Acciones</div>,
        size: 60,
        cell: ({ row }) => (
          <div className="text-right" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 cursor-pointer hover:bg-muted/80 rounded-md animate-none"
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
                  onClick={() => handleOpenDetails(row.original)}
                >
                  <Eye className="size-3.5 text-muted-foreground" />
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-xs"
                  onClick={() =>
                    toast.success(
                      `Descargando acta de sorteo para ${row.original.nroInte}...`
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
          </div>
        ),
      },
    ],
    []
  )

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

        {/* Tabla Genérica Reutilizable */}
        <DataTable
          data={filteredData}
          columns={columns}
          onRowClick={handleOpenDetails}
          emptyMessage="No se encontraron integraciones con los filtros seleccionados."
        />
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
