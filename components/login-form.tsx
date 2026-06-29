"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);

    // Simular llamada a API / autenticación durante 800ms
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Guardar credenciales simuladas en localStorage (Opción B: desarrollo amigable)
    localStorage.setItem("user-session", JSON.stringify({ username, rememberMe }));

    setIsLoading(false);
    router.push("/integraciones");
  };

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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* suario */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            Usuario
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              className="pl-10 bg-background border-border focus-visible:ring-primary/50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground font-medium">
              Contraseña
            </Label>
            <a
              href="#"
              className="text-xs text-primary dark:text-[#2dd4bf] hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 bg-background border-border focus-visible:ring-primary/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mantener sesión y recordar */}
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer select-none"
          >
            Recordar en este equipo
          </Label>
        </div>

        {/* Botón de envío */}
        <Button
          type="submit"
          className="w-full bg-[#104b45] hover:bg-[#0c3733] text-white dark:bg-[#2dd4bf] dark:hover:bg-[#22a392] dark:text-[#090d16] font-semibold transition-all shadow-md py-5 rounded-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </form>
    </div>
  );
}
