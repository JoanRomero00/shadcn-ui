import { useEffect, useState } from "react"

/**
 * Hook personalizado para retrasar la actualización de un valor (debounce).
 * Evita múltiples ejecuciones costosas (como filtrados o llamadas API) en cada pulsación de tecla.
 * 
 * @param value Valor a debouncera (ej: string de búsqueda)
 * @param delay Retraso en milisegundos (default: 300ms)
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Limpia el temporizador si el valor cambia antes de que expire el delay
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
