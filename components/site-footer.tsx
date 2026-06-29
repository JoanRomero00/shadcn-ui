import Image from "next/image"
import footerLogo from "@/public/logo_footer.png"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/50 bg-zinc-100/50 dark:bg-zinc-900/40 mt-auto">
      <div className="mx-auto max-w-[1600px] w-full px-4 py-2.5 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-muted-foreground dark:text-zinc-400">
        
        {/* Lado Izquierdo: Identidad */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          <div className="dark:bg-zinc-300 px-2 py-1 rounded-sm shadow-xs flex items-center justify-center">
            <Image
              alt="Poder Judicial de la Provincia de Santa Fe"
              className="h-auto w-[140px]"
              sizes="140px"
              src={footerLogo}
              priority
            />
          </div>
        </div>

        {/* Lado Derecho: Copyright y Versión */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[11px] text-muted-foreground/60 dark:text-zinc-400">
          <span className="font-medium text-foreground dark:text-zinc-200">República Argentina</span>
          <span className="text-muted-foreground/30 dark:text-zinc-650">•</span>
          <span className="font-medium text-foreground dark:text-zinc-200">© 2026 Todos los derechos reservados</span>
          <span className="text-muted-foreground/30 dark:text-zinc-650">•</span>
          <div className="flex items-center gap-1.5 dark:text-zinc-300">
            <span>v0.2.5</span>
            <span className="font-mono">18222d</span>
          </div>
          <span className="text-muted-foreground/30 dark:text-zinc-650">•</span>
          <strong className="rounded bg-red-800 px-2 py-0.5 text-white font-bold text-[10px] uppercase tracking-wider">
            TESTING
          </strong>
        </div>
      </div>
    </footer>
  )
}
