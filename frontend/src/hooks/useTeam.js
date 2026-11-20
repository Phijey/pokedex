import { useLocalStorage } from './useLocalStorage'

export const MAX_TEAM_SIZE = 6

// Gerencia a equipe de expedição (até 6 Pokémon) salva no navegador
export function useTeam() {
  const [teamIds, setTeamIds] = useLocalStorage('pokedex:team', [])

  function toggleTeam(id) {
    setTeamIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= MAX_TEAM_SIZE) return current
      return [...current, id]
    })
  }

  function clearTeam() {
    setTeamIds([])
  }

  function randomizeTeam(allPokemon) {
    const pool = [...allPokemon]
    const picked = []
    while (picked.length < MAX_TEAM_SIZE && pool.length > 0) {
      const index = Math.floor(Math.random() * pool.length)
      picked.push(pool.splice(index, 1)[0].id)
    }
    setTeamIds(picked)
  }

  return { teamIds, toggleTeam, clearTeam, randomizeTeam }
}
