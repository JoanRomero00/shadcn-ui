# Especificación de Diseño: Footer Minimalista para SaaS

Este documento detalla el rediseño del footer del sitio para lograr un aspecto más limpio, minimalista e integrado con el resto de la aplicación.

## Objetivos
1. **Reducir la Prominencia Visual:** Disminuir la altura y cambiar el fondo para que no compita visualmente con el contenido de la aplicación.
2. **Eliminar Redundancia:** Quitar el nombre de la institución del lado derecho del footer, ya que el logotipo oficial ya se encuentra presente en el lado izquierdo.

## Cambios Propuestos

### Componente [site-footer.tsx](file:///d:/SymfonyProyects/shadcn-dashboard-ui/components/site-footer.tsx)

- **Fondo:** Cambiar de `bg-zinc-100 dark:bg-zinc-700` a `bg-zinc-100/50 dark:bg-zinc-900/40`. Esto suaviza el contraste y permite una integración más armoniosa del footer en ambos modos de color.
- **Borde:** Mantener un borde superior sutil (`border-t border-border/50`).
- **Padding:** Reducir de `py-5` a `py-2.5` para bajar su altura.
- **Contenido:** 
  - Remover la etiqueta `<span>` con el texto "Poder Judicial de Santa Fe" y el bullet de separación (`•`) del bloque del lado derecho.
