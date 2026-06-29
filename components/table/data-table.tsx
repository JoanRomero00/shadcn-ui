"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  emptyMessage?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No se encontraron registros.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const paginationState = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const startIndex = paginationState.pageIndex * paginationState.pageSize
  const endIndex = Math.min(startIndex + paginationState.pageSize, totalRows)

  return (
    <div className="max-h-full flex flex-col min-h-0 rounded-xl border border-muted bg-card overflow-hidden shadow-xs w-full">
      <div className="flex-1 overflow-auto relative">
        <table className="w-full caption-bottom text-sm border-collapse">
          <thead className="bg-primary dark:bg-muted sticky top-0 z-10 border-b border-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-muted/80 bg-primary dark:bg-muted">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="font-bold text-xs uppercase tracking-wider h-9 text-primary-foreground dark:text-slate-300 whitespace-nowrap text-left align-middle px-3 first:pl-4 first:md:pl-6 last:pr-4 last:md:pr-6"
                      style={{
                        width: header.column.columnDef.size !== 150 ? `${header.column.columnDef.size}px` : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0 bg-card">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={`border-b border-muted/60 dark:border-muted/30 last:border-0 ${
                    onRowClick ? "hover:bg-muted/30 dark:hover:bg-primary/5 cursor-pointer transition-colors" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-2 px-3 align-middle text-xs text-foreground font-medium whitespace-nowrap first:pl-4 first:md:pl-6 last:pr-4 last:md:pr-6"
                      style={{
                        width: cell.column.columnDef.size !== 150 ? `${cell.column.columnDef.size}px` : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center text-xs text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer de Paginación Interactivo */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-muted bg-muted/10 text-xs shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Mostrar</span>
          <Select
            value={paginationState.pageSize.toString()}
            onValueChange={(val) => {
              table.setPageSize(Number(val))
            }}
          >
            <SelectTrigger className="w-16 h-8 bg-background border-muted/80 cursor-pointer rounded-lg text-xs">
              <SelectValue placeholder={paginationState.pageSize} />
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
            {totalRows > 0 ? startIndex + 1 : 0}
          </span>{" "}
          al{" "}
          <span className="font-bold text-foreground">
            {endIndex}
          </span>{" "}
          de un total de{" "}
          <span className="font-bold text-foreground">
            {totalRows}
          </span>{" "}
          registros
        </div>

        <div className="flex items-center gap-1">
          {/* Primer Página */}
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer rounded-lg font-normal text-muted-foreground hover:text-foreground"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primera página</span>
          </Button>
          {/* Página Anterior */}
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer rounded-lg font-normal text-muted-foreground hover:text-foreground"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          {/* Páginas Numéricas */}
          {Array.from({ length: table.getPageCount() }).map((_, idx) => {
            const pageNum = idx + 1
            const isActive = paginationState.pageIndex === idx
            return (
              <Button
                key={pageNum}
                variant={isActive ? "default" : "outline"}
                size="icon"
                className={`size-8 cursor-pointer rounded-lg font-semibold ${
                  isActive ? "bg-primary text-primary-foreground hover:bg-primary/95" : ""
                }`}
                onClick={() => table.setPageIndex(idx)}
              >
                {pageNum}
              </Button>
            )
          })}

          {/* Página Siguiente */}
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer rounded-lg font-normal text-muted-foreground hover:text-foreground"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
          {/* Última Página */}
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer rounded-lg font-normal text-muted-foreground hover:text-foreground"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
