"use client";

import * as React from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { TableToolbar } from "@/components/table/table-toolbar";
import { StatusBadge } from "@/components/table/status-badge";
import { DataTable } from "@/components/table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  FileDown,
  Printer,
  Eye,
  Edit,
  Trash,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  apiPresidenciasGetCollection,
  apiPresidenciasPost,
  apiPresidenciasIdPatch,
  apiPresidenciasIdDelete,
  type Presidencia,
} from "@/lib/api";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CrudFormDialog,
  type CrudField,
} from "@/components/dialogs/crud-form-dialog"
import { CrudDetailDialog } from "@/components/dialogs/crud-detail-dialog";
import { CrudDeleteDialog } from "@/components/dialogs/crud-delete-dialog";

export default function PresidenciasPage() {
  const [data, setData] = React.useState<Presidencia[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Estados para búsqueda y filtrado
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [estadoFilter, setEstadoFilter] = React.useState("todos");

  // Estados para creación y edición
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedPresidencia, setSelectedPresidencia] =
    React.useState<Presidencia | null>(null);

  const presidenciaFields = React.useMemo<CrudField[]>(
    () => [
      {
        name: "tribu",
        label: "Tribunal / Nombre",
        type: "text",
        placeholder: "Ej: Cámara Civil y Comercial Sala I...",
        required: true,
      },
      {
        name: "codFuero",
        label: "Código de Fuero",
        type: "text",
        placeholder: "Ej: CIV, PEN, LAB...",
        required: true,
      },
      {
        name: "cantSala",
        label: "Cantidad de Salas",
        type: "number",
        placeholder: "Ej: 1, 2...",
        required: true,
        min: 1,
      },
      {
        name: "vocSala",
        label: "Vocales por Sala",
        type: "number",
        placeholder: "Ej: 3, 5...",
        required: true,
        min: 1,
      },
      {
        name: "email",
        label: "Correo Electrónico",
        type: "email",
        placeholder: "Ej: camcivil1sfe@justiciasantafe.gov.ar",
        required: true,
      },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        required: true,
        defaultValue: "ACTIVO",
        options: [
          { label: "Activo", value: "ACTIVO" },
          { label: "Inactivo", value: "INACTIVO" },
        ],
      },
    ],
    [],
  );

  const handleCreate = async (values: any) => {
    const { error, response } = await apiPresidenciasPost({
      body: values,
    });
    if (error) {
      toast.error(
        `Error al crear la presidencia: ${response?.statusText || "Error del servidor"}`,
      );
      throw error;
    }
    toast.success("Presidencia creada exitosamente.");
    fetchPresidencias();
  };

  const handleEdit = async (values: any) => {
    if (!selectedPresidencia?.id) return;
    const { error, response } = await apiPresidenciasIdPatch({
      path: { id: selectedPresidencia.id.toString() },
      body: values,
    });
    if (error) {
      toast.error(
        `Error al actualizar la presidencia: ${response?.statusText || "Error del servidor"}`,
      );
      throw error;
    }
    toast.success("Presidencia actualizada exitosamente.");
    fetchPresidencias();
  };

  const handleDelete = async () => {
    if (!selectedPresidencia?.id) return;
    const { error, response } = await apiPresidenciasIdDelete({
      path: { id: selectedPresidencia.id.toString() },
    });
    if (error) {
      toast.error(
        `Error al eliminar la presidencia: ${response?.statusText || "Error del servidor"}`,
      );
      throw error;
    }
    toast.success("Presidencia eliminada exitosamente.");
    fetchPresidencias();
  };

  const fetchPresidencias = React.useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const {
        data: resData,
        error,
        response,
      } = await apiPresidenciasGetCollection();

      if (error) {
        if (response?.status === 401) {
          setErrorMsg("No autorizado. Inicie sesión nuevamente.");
        } else {
          setErrorMsg(
            `Error ${response?.status || "desconocido"}: ${response?.statusText || "No se pudieron obtener las presidencias"}`,
          );
        }
        return;
      }

      if (resData) {
        // Manejar formatos JSON-LD, array plano o paginados
        if (Array.isArray(resData)) {
          setData(resData);
        } else if (
          typeof resData === "object" &&
          "items" in resData &&
          Array.isArray((resData as any).items)
        ) {
          setData((resData as any).items);
        } else if (
          typeof resData === "object" &&
          "hydra:member" in resData &&
          Array.isArray((resData as any)["hydra:member"])
        ) {
          setData((resData as any)["hydra:member"]);
        } else if (
          typeof resData === "object" &&
          "member" in resData &&
          Array.isArray((resData as any)["member"])
        ) {
          setData((resData as any)["member"]);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error de conexión. Verifique el backend Symfony.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPresidencias();
  }, [fetchPresidencias]);

  // Limpiar filtros activos
  const handleClearFilters = () => {
    setSearchTerm("");
    setEstadoFilter("todos");
    toast.info("Filtros restablecidos");
  };

  const showClearButton = searchTerm !== "" || estadoFilter !== "todos";

  // Lógica de filtrado en el cliente (búsqueda y estado)
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // Filtrar por estado
      const matchesEstado =
        estadoFilter === "todos"
          ? true
          : item.estado?.toLowerCase() === estadoFilter.toLowerCase();

      // Filtrar por texto (tribunal, código de fuero, o email)
      const query = debouncedSearchTerm.toLowerCase().trim();
      const matchesSearch =
        query === ""
          ? true
          : item.tribu?.toLowerCase().includes(query) ||
            false ||
            item.codFuero?.toLowerCase().includes(query) ||
            false ||
            item.email?.toLowerCase().includes(query) ||
            false;

      return matchesEstado && matchesSearch;
    });
  }, [data, debouncedSearchTerm, estadoFilter]);

  // Configuración de las columnas de la tabla
  const columns = React.useMemo<ColumnDef<Presidencia>[]>(
    () => [
      {
        accessorKey: "tribu",
        header: "Tribunal / Presidencia",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground">
            {row.getValue("tribu") || "Sin nombre"}
          </span>
        ),
      },
      {
        accessorKey: "codFuero",
        header: "Fuero",
        size: 100,
        cell: ({ row }) => (
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {row.getValue("codFuero") || "S/F"}
          </span>
        ),
      },
      {
        accessorKey: "cantSala",
        header: "Cant. Salas",
        size: 110,
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground">
            {row.getValue("cantSala") ?? 0}
          </span>
        ),
      },
      {
        accessorKey: "vocSala",
        header: "Vocales/Sala",
        size: 110,
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground">
            {row.getValue("vocSala") ?? 0}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email Institucional",
        cell: ({ row }) => (
          <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px] block">
            {row.getValue("email") || "—"}
          </span>
        ),
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 130,
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <StatusBadge status={row.getValue("estado") || "ACTIVO"} />
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right w-full">Acciones</div>,
        size: 120,
        cell: ({ row }) => (
          <div
            className="flex items-center justify-end gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8 cursor-pointer hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200"
              title="Ver Detalles"
              onClick={() => {
                setSelectedPresidencia(row.original)
                setIsDetailOpen(true)
              }}
            >
              <Eye className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8 cursor-pointer hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200"
              title="Editar"
              onClick={() => {
                setSelectedPresidencia(row.original);
                setIsEditOpen(true);
              }}
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8 cursor-pointer hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-all duration-200"
              title="Eliminar"
              onClick={() => {
                setSelectedPresidencia(row.original)
                setIsDeleteOpen(true)
              }}
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

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
  ];

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
  ];

  return (
    <>
      <SiteHeader
        title="Presidencias"
        action={
          <div className="flex items-center gap-2">

            <Button
              onClick={() => setIsCreateOpen(true)}
              className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 rounded-lg px-3 h-8 text-xs font-semibold"
            >
              <Plus className="size-3.5" />
              Nueva Presidencia
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6 max-w-[1600px] w-full mx-auto overflow-hidden">
        {/* Barra de herramientas */}
        <TableToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por tribunal, fuero o email..."
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
              <p className="font-medium text-destructive-foreground">
                Error de carga
              </p>
              <p className="text-xs opacity-90">{errorMsg}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-destructive/30 hover:bg-destructive/10 text-destructive font-semibold"
              onClick={fetchPresidencias}
            >
              Reintentar
            </Button>
          </div>
        )}

        {/* Vista principal (Cargando o Tabla) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3 min-h-[300px] border border-border/80 rounded-xl bg-card">
            <Loader2 className="h-8 w-8 animate-spin text-[#104b45] dark:text-[#2dd4bf]" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">
              Cargando presidencias del servidor...
            </p>
          </div>
        ) : (
          !errorMsg && (
            <DataTable
              data={filteredData}
              columns={columns}
              emptyMessage="No se encontraron presidencias registradas."
            />
          )
        )}
      </div>

      <CrudFormDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Nueva Presidencia"
        fields={presidenciaFields}
        onSubmit={handleCreate}
        submitLabel="Crear"
      />

      <CrudFormDialog
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPresidencia(null);
        }}
        title="Editar Presidencia"
        fields={presidenciaFields}
        initialValues={selectedPresidencia}
        onSubmit={handleEdit}
        submitLabel="Guardar Cambios"
      />

      <CrudDetailDialog
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedPresidencia(null)
        }}
        title="Detalles de la Presidencia"
        fields={presidenciaFields}
        data={selectedPresidencia}
      />

      <CrudDeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setSelectedPresidencia(null)
        }}
        title="Eliminar Presidencia"
        itemName={selectedPresidencia ? selectedPresidencia.tribu || "" : ""}
        onSubmit={handleDelete}
      />
    </>
  );
}
