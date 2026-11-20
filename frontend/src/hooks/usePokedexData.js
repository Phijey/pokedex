import { useCallback, useEffect, useState } from 'react'
import {
  createPokemon,
  deletePokemon,
  getPokemons,
  getTrainers,
  getTypes,
  updatePokemon,
} from '../api/pokedexApi'

// Carrega Pokémon, tipos e treinadores da API e expõe o estado da requisição.
// `status`: 'loading' | 'ready' | 'error'
export function usePokedexData() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const [pokemon, types, trainers] = await Promise.all([getPokemons(), getTypes(), getTrainers()])
      setData({ pokemon, types, trainers })
      setStatus('ready')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const reload = useCallback(() => {
    setStatus('loading')
    return load()
  }, [load])

  // Mutações: chamam a API e só então atualizam a lista local (mantida em ordem de id)
  const addPokemon = useCallback(async (pokemon) => {
    const saved = await createPokemon(pokemon)
    setData((current) => ({ ...current, pokemon: [...current.pokemon, saved].sort((a, b) => a.id - b.id) }))
    return saved
  }, [])

  const editPokemon = useCallback(async (id, pokemon) => {
    const saved = await updatePokemon(id, pokemon)
    setData((current) => ({ ...current, pokemon: current.pokemon.map((p) => (p.id === id ? saved : p)) }))
    return saved
  }, [])

  const removePokemon = useCallback(async (id) => {
    await deletePokemon(id)
    setData((current) => ({ ...current, pokemon: current.pokemon.filter((p) => p.id !== id) }))
  }, [])

  return { data, status, error, reload, addPokemon, editPokemon, removePokemon }
}
