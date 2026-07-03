"use client"

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import Image from "next/image";
import escudo from "@/public/escudo.gif";
import { Loader2 } from "lucide-react";

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-sidebar relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Contenido de Carga */}
        <div className="flex flex-col items-center space-y-6 z-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-3.5 shadow-xl transition-transform duration-300 hover:scale-105">
            <Image
              src={escudo}
              alt="Escudo del Poder Judicial"
              className="h-full w-full object-contain filter drop-shadow-md opacity-80"
              priority
            />
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <h3 className="text-white text-base font-semibold tracking-wide">
              Poder Judicial de Santa Fe
            </h3>
            <p className="text-sidebar-foreground/50 text-xs tracking-wider uppercase font-medium flex items-center gap-2 justify-center">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-400" />
              Verificando credenciales...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Evitar parpadeos de contenido mientras redirige
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="max-h-screen md:max-h-[calc(100vh-1rem)] flex flex-col overflow-hidden">
        <div key={pathname} className="flex flex-1 flex-col overflow-hidden animate-fade-in-up">
          {children}
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
