"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { client } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"

// Definición del esquema de validación Zod
const loginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean().default(false),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [apiError, setApiError] = React.useState<string | null>(null)

  // Inicializar React Hook Form con Zod resolver
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  })

  const { handleSubmit, control, setValue, formState: { isSubmitting } } = form

  // Cargar usuario recordado de localStorage al iniciar
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const remembered = localStorage.getItem("remembered_username")
      if (remembered) {
        setValue("username", remembered)
        setValue("rememberMe", true)
      }
    }
  }, [setValue])

  // Manejar el submit del formulario
  const onSubmit = async (values: LoginSchemaType) => {
    setApiError(null)

    // Usamos el cliente configurado directamente para hacer el POST stateless /login
    const { data, error, response } = await client.post<{ token: string }, { message?: string }>({
      url: "/login",
      body: {
        username: values.username,
        password: values.password,
      },
    })

    // Capturar y manejar errores comunes de la API
    if (error) {
      if (response.status === 401) {
        setApiError("Usuario o contraseña incorrectos.")
        form.setError("username", { type: "manual", message: "Credenciales inválidas" })
        form.setError("password", { type: "manual", message: "Credenciales inválidas" })
      } else if (response.status === 429) {
        setApiError("Límite de peticiones de login superado. Por favor, intente más tarde.")
      } else {
        setApiError("Ha ocurrido un error al conectar con el servidor. Por favor, intente nuevamente.")
      }
      return
    }

    if (data?.token) {
      // Guardar token JWT
      localStorage.setItem("jwt_token", data.token)

      // Guardar/Limpiar recordar usuario
      if (values.rememberMe) {
        localStorage.setItem("remembered_username", values.username)
      } else {
        localStorage.removeItem("remembered_username")
      }

      // Redirección exitosa
      router.push("/integraciones")
    }
  }

  return (
    <div className="w-full max-w-md bg-card text-card-foreground border border-border/85 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 mx-4">
      <div className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Ingresar al Sistema
        </h1>
        <p className="text-sm text-muted-foreground">
          Por favor, ingrese sus credenciales.
        </p>
      </div>

      {/* Alerta de Error de API */}
      {apiError && (
        <div className="flex items-center gap-2 bg-destructive/15 border border-destructive/25 text-destructive p-3 rounded-lg text-sm animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Usuario */}
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Usuario</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      type="text"
                      className="pl-10 bg-background border-border focus-visible:ring-primary/50"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Contraseña */}
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-foreground font-medium">Contraseña</FormLabel>
                  <a
                    href="#"
                    className="text-xs text-primary dark:text-[#2dd4bf] hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 bg-background border-border focus-visible:ring-primary/50"
                      disabled={isSubmitting}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mantener sesión y recordar */}
          <FormField
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0 pt-1">
                <FormControl>
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <Label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Recordar en este equipo
                </Label>
              </FormItem>
            )}
          />

          {/* Botón de envío */}
          <Button
            type="submit"
            className="w-full bg-[#104b45] hover:bg-[#0c3733] text-white dark:bg-[#2dd4bf] dark:hover:bg-[#22a392] dark:text-[#090d16] font-semibold transition-all shadow-md py-5 rounded-lg flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
