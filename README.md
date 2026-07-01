# Sistema Base

Este proyecto es el panel de control de administración y frontend para el **Sistema de Integraciones**. 

Está construido con **React 19, Next.js 16 (App Router), Tailwind CSS v4, y Shadcn UI** utilizando el estilo moderno `radix-nova`.

---

## 🚀 Características Principales

*   **Autenticación Stateless JWT**: Flujo de inicio de sesión seguro y stateless integrado con el backend de Symfony.
*   **Formularios con Shadcn UI & Zod**: Formulario de login integrado con validación de datos en cliente y captura dinámica de errores de API (e.g., `401` Credenciales Inválidas y `429` Límite de Intentos Superado).
*   **Persistencia de Sesión**: Soporte para recordar el nombre de usuario y almacenamiento automático de tokens en `localStorage`.
*   **Clientes API y Tipos Autogenerados**: Integración robusta mediante `@hey-api/openapi-ts` para compilar automáticamente el SDK de TypeScript directamente del esquema OpenAPI expuesto por el backend.
*   **Vistas Protegidas**: Pantalla de usuarios que consume recursos seguros bajo `/api/*` inyectando automáticamente la cabecera `Authorization: Bearer <token>` a través de interceptores.
*   **Navegación e Interfaz**: Barra lateral (Sidebar) colapsable, estructura de layouts privados, notificaciones con Sonner y componentes de tabla accesibles.

---

## 🛠️ Stack Tecnológico

*   **Framework**: Next.js 16 (App Router) & React 19
*   **Lenguaje**: TypeScript
*   **Estilos y UI**: Tailwind CSS v4, Shadcn UI (`radix-nova`), Radix UI
*   **Formularios**: React Hook Form & Zod Resolver
*   **Consumo API**: `@hey-api/client-fetch` & `@hey-api/openapi-ts`
*   **Iconos**: Lucide React

---

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la interfaz corriendo.


---

## ⚙️ Configuración y Levantamiento del Frontend

Para que la comunicación con la API funcione correctamente, **el backend en Symfony debe estar previamente en ejecución** (por defecto configurado en `http://localhost:8000`).

Una vez que el backend esté activo, sigue estos pasos para levantar la interfaz:

1. **Instalar Dependencias**:
   ```bash
   npm install
   ```

2. **Generar el Cliente API y los Tipos**:
   Este comando lee el esquema de OpenAPI del backend y compila el SDK de servicios y tipos de TypeScript en `lib/api/generated`:
   ```bash
   npm run openapi-ts
   ```
   *Nota: Se debe re-ejecutar este comando siempre que se realicen cambios o adiciones en los endpoints del backend.*

3. **Iniciar el Servidor de Desarrollo**:
   ```bash
   npm run dev
   ```
   Por defecto, la aplicación estará disponible en [http://localhost:3000](http://localhost:3000).


