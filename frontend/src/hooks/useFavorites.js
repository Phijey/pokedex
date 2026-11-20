import { useLocalStorage } from './useLocalStorage'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('pokedex:favoritos', [])

  function toggleFavorite(id) {
    setFavorites((current) => (current.includes(id) ? current.filter((fav) => fav !== id) : [...current, id]))
  }

  return { favorites, toggleFavorite }
}
