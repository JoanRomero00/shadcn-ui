"use client"

import * as React from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { TableToolbar } from "@/components/table/table-toolbar"
import { StatusBadge } from "@/components/table/status-badge"
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
  Edit,
  Trash,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { apiTipoMarcasGetCollection, type TipoMarca } from "@/lib/api"
import { useDebounce } from "@/hooks/use-debounce"

export default function TiposMarcaPage() {
  const [data, setData] = React.useState<TipoMarca[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = React.useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [estadoFilter, setEstadoFilter] = React.useState("todos")

  const fetchTiposMarca = React.useCallback(async () => {
    setIsLoading(true)
    setErrorMsg(null)
    try {
      const { data: resData, error, response } = await apiTipoMarcasGetCollection()

      if (error) {
        if (response?.status === 401) {
          setErrorMsg("No autorizado. Inicie sesión nuevamente.")
        } else {
          setErrorMsg(`Error ${response?.status || "desconocido"}: ${response?.statusText || "No se pudieron obtener los tipos de marca"}`)
        }
        return
      }

      if (resData) {
        // Manejar formatos JSON-LD, array plano o paginados
        if (Array.isArray(resData)) {
          setData(resData)
        } else if (typeof resData === "object" && "items" in resData && Array.isArray((resData as any).items)) {
          setData((resData as any).items)
        } else if (typeof resData === "object" && "hydra:member" in resData && Array.isArray((resData as any)["hydra:member"])) {
          setData((resData as any)["hydra:member"])
        } else if (typeof resData === "object" && "member" in resData && Array.isArray((resData as any)["member"])) {
          setData((resData as any)["member"])
        } else {
          setData([])
        }
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("Error de conexión. Verifique el backend Symfony.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchTiposMarca()
  }, [fetchTiposMarca])

  // Limpiar filtros activos
  const handleClearFilters = () => {
    setSearchTerm("")
    setEstadoFilter("todos")
    toast.info("Filtros restablecidos")
  }

  const showClearButton = searchTerm !== "" || estadoFilter !== "todos"

  // Lógica de filtrado en el cliente (búsqueda y estado)
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Filtrar por estado
      const matchesEstado =
        estadoFilter === "todos"
          ? true
          : item.estado?.toLowerCase() === estadoFilter.toLowerCase()

      // Filtrar por texto (letra o descripción)
      const query = debouncedSearchTerm.toLowerCase().trim()
      const matchesSearch =
        query === ""
          ? true
          : (item.descripcion?.toLowerCase().includes(query) || false) ||
            (item.letra?.toLowerCase().includes(query) || false)

      return matchesEstado && matchesSearch
    })
  }, [data, debouncedSearchTerm, estadoFilter])

  // Configuración de las columnas de la tabla
  const columns = React.useMemo<ColumnDef<TipoMarca>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            #{row.getValue("id")}
          </span>
        ),
      },
      {
        accessorKey: "letra",
        header: "Letra",
        size: 120,
        cell: ({ row }) => (
          <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2.5 py-1 rounded-md border border-teal-100 dark:border-teal-900/50">
            {row.getValue("letra") || "—"}
          </span>
        ),
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground">
            {row.getValue("descripcion") || "Sin descripción"}
          </span>
        ),
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 150,
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <StatusBadge status={row.getValue("estado") || "ACTIVO"} />
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
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px] rounded-lg">
                <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">
                  Operaciones
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-xs"
                  onClick={() =>
                    toast.info(`Detalle: ${row.original.descripcion}`)
                  }
                >
                  Ver Detalles
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-xs"
                  onClick={() =>
                    toast.info("Edición deshabilitada temporalmente.")
                  }
                >
                  <Edit className="size-3.5 text-muted-foreground" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-xs text-red-650 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  onClick={() =>
                    toast.error("No cuenta con permisos para eliminar tipos de marca.")
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

  // Filtros de barra de herramientas
  const toolbarFilters = [
    {
      key: "estado",
      value: estadoFilter,
      placeholder: "Estado",
      options: [
        { label: "Todos los estados", value: "todos" },
        { label: "Activos", value: "activo" },
        { label: "Inactivos", value: "inactivo" },
      ],
      onChange: setEstadoFilter,
    },
  ]

  // Exportaciones
  const exportActions = [
    {
      label: "CSV",
      icon: <FileDown className="size-3.5" />,
      onClick: () => toast.success("Exportando tabla a formato CSV..."),
    },
    {
      label: "Imprimir",
      icon: <Printer className="size-3.5" />,
      onClick: () => window.print(),
    },
  ]

  return (
    <>
      <SiteHeader
        title="Tipos de Marca"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={fetchTiposMarca}
              disabled={isLoading}
              className="h-8 w-8 cursor-pointer rounded-lg border border-border"
              title="Recargar datos"
            >
              <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              onClick={() =>
                toast.info("Formulario de creación de tipos de marca en desarrollo.")
              }
              className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 rounded-lg px-3 h-8 text-xs font-semibold"
            >
              <Plus className="size-3.5" />
              Nuevo Tipo de Marca
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6 max-w-[1600px] w-full mx-auto overflow-hidden">
        {/* Barra de herramientas */}
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por descripción o letra de marca..."
          filters={toolbarFilters}
          showClearButton={showClearButton}
          onClearFilters={handleClearFilters}
          exportActions={exportActions}
        />

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="flex items-center gap-3 bg-destructive/15 border border-destructive/25 text-destructive p-4 rounded-xl text-sm max-w-lg mx-auto my-6 shadow-sm w-full">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-destructive-foreground">Error de carga</p>
              <p className="text-xs opacity-90">{errorMsg}</p>
            </div>
            <Button size="sm" variant="outline" className="border-destructive/30 hover:bg-destructive/10 text-destructive font-semibold" onClick={fetchTiposMarca}>
              Reintentar
            </Button>
          </div>
        )}

        {/* Vista principal (Cargando o Tabla) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3 min-h-[300px] border border-border/80 rounded-xl bg-card">
            <Loader2 className="h-8 w-8 animate-spin text-[#104b45] dark:text-[#2dd4bf]" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">
              Cargando tipos de marca del servidor...
            </p>
          </div>
        ) : (
          !errorMsg && (
            <DataTable
              data={filteredData}
              columns={columns}
              emptyMessage="No se encontraron tipos de marca registrados."
            />
          )
        )}
      </div>
    </>
  )
}
