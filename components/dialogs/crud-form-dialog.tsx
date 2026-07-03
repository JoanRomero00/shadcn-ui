"use client"

import * as React from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface CrudField {
  name: string
  label: string
  type: "text" | "number" | "email" | "select"
  placeholder?: string
  required?: boolean
  defaultValue?: any
  options?: { label: string; value: string | number }[]
  min?: number
  max?: number
  step?: number
}

interface CrudFormDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  fields: CrudField[]
  initialValues?: any
  onSubmit: (values: any) => Promise<void>
  submitLabel?: string
}

export function CrudFormDialog({
  isOpen,
  onClose,
  title,
  fields,
  initialValues,
  onSubmit,
  submitLabel = "Guardar",
}: CrudFormDialogProps) {
  const [formValues, setFormValues] = React.useState<Record<string, any>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"

      // Initialize form values
      const initial: Record<string, any> = {}
      fields.forEach((field) => {
        initial[field.name] =
          initialValues?.[field.name] ?? field.defaultValue ?? ""
      })
      setFormValues(initial)
      setErrors({})
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, initialValues, fields, isSubmitting])

  if (!isOpen) return null

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const val = formValues[field.name]
      if (
        field.required &&
        (val === undefined || val === null || String(val).trim() === "")
      ) {
        newErrors[field.name] = "Este campo es requerido"
      }
      if (field.type === "email" && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(val)) {
          newErrors[field.name] = "Formato de correo electrónico inválido"
        }
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const submissionValues: Record<string, any> = {}
      fields.forEach((field) => {
        let val = formValues[field.name]
        if (field.type === "number" && val !== "") {
          val = Number(val)
        }
        submissionValues[field.name] = val
      })
      await onSubmit(submissionValues)
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => {
        if (!isSubmitting) onClose()
      }}
    >
      <div
        className="relative max-w-lg w-full mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border-0 dark:border dark:border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#104b45] p-4 text-white">
          <span className="font-semibold text-lg">{title}</span>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-white disabled:pointer-events-none"
          >
            <X className="size-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="text-xs font-semibold text-foreground">
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    value={formValues[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-card text-foreground border border-input rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring transition-all cursor-pointer disabled:bg-muted/40 disabled:cursor-not-allowed"
                  >
                    {field.placeholder && (
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                    )}
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formValues[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    disabled={isSubmitting}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className={`focus-visible:ring-ring transition-all ${
                      errors[field.name] ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-[11px] text-destructive font-medium">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t bg-muted/20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg text-xs font-semibold px-4 py-2 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs transition-all cursor-pointer gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Procesando...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
