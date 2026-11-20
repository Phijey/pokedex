import { useCallback, useEffect, useState } from 'react'
import { getPokemons, getTrainers, getTypes } from '../api/pokedexApi'

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

  return { data, status, error, reload }
}
