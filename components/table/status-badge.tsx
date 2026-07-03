import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, FileText, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().trim()

  let colorClasses = ""
  let Icon = Clock
  let label = status
  let pulse = false

  switch (normalizedStatus) {
    // Integraciones y estados comunes
    case "completado":
    case "completada":
    case "aprobada":
    case "resuelto":
      colorClasses = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      Icon = CheckCircle2
      label = status
      break
    case "activo":
    case "a":
      colorClasses = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      Icon = CheckCircle2
      label = "Activo"
      break
    case "pendiente":
      colorClasses = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      Icon = Clock
      label = status
      pulse = true
      break
    case "en firma":
      colorClasses = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      Icon = FileText
      label = status
      pulse = true
      break
    case "error":
    case "rechazada":
      colorClasses = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      Icon = AlertTriangle
      label = status
      break
    case "licencia":
    case "excusa":
    case "recusación":
    case "integración por excusa":
    case "integración por recusación":
      colorClasses = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
      Icon = AlertTriangle
      label = status
      break
    case "inactivo":
    case "i":
      colorClasses = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      Icon = XCircle
      label = "Inactivo"
      break
    case "archivado":
    default:
      colorClasses = "bg-muted text-muted-foreground border-muted-foreground/20"
      Icon = Clock
      label = status
      break
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase transition-all duration-300",
        colorClasses,
        className
      )}
    >
      <Icon />
      <span>{label}</span>
      {pulse && (
        <span className="relative flex size-1.5 ml-0.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex size-1.5 rounded-full bg-current"></span>
        </span>
      )}
    </Badge>
  )
}
