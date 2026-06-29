import type { Metadata } from "next"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"
import { LoginThemeToggle } from "@/components/login-theme-toggle"
import escudo from "@/public/escudo.gif"

export const metadata: Metadata = {
  title: "Iniciar Sesión | Sistema de Integraciones",
  description: "Acceso al Sistema de Integraciones del Poder Judicial de Santa Fe",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 md:grid-cols-12 overflow-x-hidden bg-sidebar">
      {/* Estilos locales para las microanimaciones premium */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-blob-reverse {
          0%, 100% { transform: translate(0px, 0px) scale(1.15); }
          33% { transform: translate(-40px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.05); }
        }
        .animate-blob {
          animation: float-blob 16s infinite alternate ease-in-out;
        }
        .animate-blob-reverse {
          animation: float-blob-reverse 20s infinite alternate ease-in-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Columna Izquierda: Panel Institucional (Visible en md+) */}
      <section className="hidden md:flex md:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-[#104b45] to-[#072421] text-white relative overflow-hidden">
        {/* Glowing Blobs (Efecto Nebulosa Fluida en el fondo) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-blob-reverse" />
        </div>

        {/* Decoración geométrica de fondo (líneas abstractas sutiles) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Cabecera del Panel - Animada */}
        <div className="flex items-center space-x-4 z-10 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-lg transition-transform duration-300 hover:scale-105">
            <Image
              src={escudo}
              alt="Escudo del Poder Judicial de Santa Fe"
              className="h-full w-full object-contain filter drop-shadow-sm"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base md:text-lg font-bold tracking-wide text-white leading-tight">
              Poder Judicial
            </span>
            <span className="text-[10px] md:text-xs tracking-widest uppercase font-semibold text-white/70">
              Provincia de Santa Fe
            </span>
          </div>
        </div>

        {/* Contenido Central - Animado con retraso */}
        <div className="flex flex-col text-left space-y-4 z-10 my-auto pr-6 animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
          <h2 className="text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sistema de <br />
            Integraciones
          </h2>
          <div className="w-12 h-1 bg-[#2dd4bf]/80 rounded-full" />
          <p className="text-sm text-white/80 max-w-lg leading-relaxed font-light">
            Este es el Sistema para gestionar las <strong className="font-semibold text-white">Integraciones de Vocales</strong>,
            desarrollado por el Poder Judicial de Santa Fe. <br />
            Por consultas comunicarse al correo: <a href="mailto:informatica@justiciasantafe.gov.ar" className="font-semibold text-white hover:underline">informatica@justiciasantafe.gov.ar</a>
          </p>
        </div>

        {/* Pie del Panel - Animado con retraso */}
        <div className="z-10 text-xs text-white/50 font-medium animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
          © {new Date().getFullYear()} Poder Judicial de Santa Fe - Republica Argentina. Todos los derechos reservados.
        </div>
      </section>

      {/* Columna Derecha: Formulario y Acceso */}
      <section className="col-span-1 md:col-span-7 flex flex-col justify-center items-center relative p-6 md:p-12 bg-background">
        {/* Patrón de puntos decorativo en el fondo derecho */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Toggle de Modo Claro/Oscuro flotante */}
        <div className="absolute right-4 top-4 md:right-8 md:top-8 z-20">
          <LoginThemeToggle />
        </div>

        {/* Contenedor del formulario - Animado con retraso e interactivo */}
        <div className="w-full flex justify-center py-8 z-10 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <div className="w-full max-w-md transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  )
}
