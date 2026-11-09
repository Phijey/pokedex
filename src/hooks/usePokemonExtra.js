import { useEffect, useState } from 'react'

const API = 'https://pokeapi.co/api/v2'

// Guarda as respostas já recebidas para não buscar o mesmo Pokémon duas vezes
// (as páginas do modal e a folha que vira mostram o mesmo Pokémon ao mesmo tempo)
const cache = new Map()

// Busca informações complementares (altura, peso, espécie e descrição) na PokéAPI.
// A Pokédex continua funcionando sem essa chamada, usando apenas o JSON local.
export function usePokemonExtra(id) {
  const [state, setState] = useState(() => cache.get(id) ?? { status: 'loading', data: null })

  useEffect(() => {
    if (cache.has(id)) {
      setState(cache.get(id))
      return undefined
    }

    const controller = new AbortController()
    setState({ status: 'loading', data: null })

    Promise.all([
      fetch(`${API}/pokemon/${id}`, { signal: controller.signal }).then((res) => res.json()),
      fetch(`${API}/pokemon-species/${id}`, { signal: controller.signal }).then((res) => res.json()),
    ])
      .then(([pokemon, species]) => {
        const flavor = species.flavor_text_entries.find((entry) => entry.language.name === 'en')
        const genus = species.genera.find((entry) => entry.language.name === 'en')
        const result = {
          status: 'done',
          data: {
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            genus: genus?.genus ?? '',
            flavor: flavor ? flavor.flavor_text.replace(/[\f\n\r]+/g, ' ') : '',
          },
        }
        cache.set(id, result)
        setState(result)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null })
      })

    return () => controller.abort()
  }, [id])

  return state
}
