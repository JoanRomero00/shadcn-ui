"use client"

import * as React from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { UsuarioList } from "@/components/auth/usuario-list"

export default function UsuariosPage() {
  return (
    <>
      {/* Barra superior de navegación / identidad del módulo */}
      <SiteHeader title="Usuarios" />
      
      {/* Contenedor principal con scroll vertical en caso de listados largos */}
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5 lg:p-6 max-w-[1600px] w-full mx-auto overflow-y-auto">
        <UsuarioList />
      </div>
    </>
  )
}
