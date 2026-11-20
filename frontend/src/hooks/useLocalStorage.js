import { useEffect, useState } from 'react'

// useState que também salva o valor no localStorage do navegador
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // navegação privada ou armazenamento bloqueado: segue apenas em memória
    }
  }, [key, value])

  return [value, setValue]
}
