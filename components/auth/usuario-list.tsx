"use client"

import * as React from "react"
import { apiUsuariosGetCollection } from "@/lib/api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertCircle, Loader2 } from "lucide-react"

// Tipo local para representar la entidad Usuario
interface Usuario {
  id?: string | number
  username?: string
  email?: string
  nombre?: string
  roles?: string[]
}

export function UsuarioList() {
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchUsuarios = async () => {
      setIsLoading(true)
      setErrorMsg(null)

      try {
        // Ejecutar llamada a la API protegida
        const { data, error, response } = await apiUsuariosGetCollection()

        if (error) {
          if (response?.status === 401) {
            setErrorMsg("No autorizado. Su sesión puede haber expirado o el token es inválido.")
          } else {
            setErrorMsg(`Error ${response?.status || "desconocido"}: ${response?.statusText || "No se pudieron obtener los datos"}`)
          }
          return
        }

        // Manejar el formato de la API (JSON-LD Hydra, array plano o paginado con objeto items)
        if (data) {
          if (Array.isArray(data)) {
            setUsuarios(data)
          } else if (typeof data === "object" && "items" in data && Array.isArray((data as any).items)) {
            setUsuarios((data as any).items)
          } else if (typeof data === "object" && "hydra:member" in data) {
            setUsuarios((data as any)["hydra:member"])
          } else if (typeof data === "object" && "member" in data) {
            setUsuarios((data as any)["member"])
          } else {
            setUsuarios([])
          }
        }
      } catch (err: any) {
        setErrorMsg("Error de red. Verifique que el backend http://localhost:8000 esté corriendo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-3 min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#104b45] dark:text-[#2dd4bf]" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Cargando datos protegidos de la API...
        </p>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="flex items-center gap-3 bg-destructive/15 border border-destructive/25 text-destructive p-4 rounded-xl text-sm max-w-lg mx-auto my-6 shadow-sm">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-destructive-foreground">Error de autenticación/conexión</p>
          <p className="text-xs opacity-90">{errorMsg}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card border border-border/85 rounded-2xl shadow-lg space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Listado de Usuarios (Protegido por JWT)
        </h2>
        <p className="text-sm text-muted-foreground">
          Esta información proviene del backend protegido bajo `/api/usuarios`. Solo visible tras autenticarse con éxito.
        </p>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombre / Email</TableHead>
              <TableHead>Nombre de Usuario</TableHead>
              <TableHead className="text-right">Roles asignados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-28 text-center text-muted-foreground">
                  No se encontraron registros de usuarios en la base de datos.
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario, index) => (
                <TableRow key={usuario.id || index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                    #{usuario.id ?? index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {usuario.nombre || "Joan Romero"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {usuario.email || `${usuario.username || "user"}@example.com`}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{usuario.username || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {usuario.roles?.map((rol) => (
                        <span
                          key={rol}
                          className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary dark:text-[#2dd4bf] ring-1 ring-inset ring-primary/20"
                        >
                          {rol.replace("ROLE_", "")}
                        </span>
                      )) || (
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                          USER
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
