import { useLocalStorage } from './useLocalStorage'

// Anotações pessoais de cada Pokémon, salvas no navegador: { [id]: "texto" }
export function useNotes() {
  const [notes, setNotes] = useLocalStorage('pokedex:anotacoes', {})

  function saveNote(id, text) {
    setNotes((current) => {
      const updated = { ...current }
      if (text.trim()) updated[id] = text
      else delete updated[id]
      return updated
    })
  }

  return { notes, saveNote }
}
