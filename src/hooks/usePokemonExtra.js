import { useEffect, useState } from 'react'

const API = 'https://pokeapi.co/api/v2'

// Busca informações complementares (altura, peso, espécie e descrição) na PokéAPI.
// A Pokédex continua funcionando sem essa chamada, usando apenas o JSON local.
export function usePokemonExtra(id) {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null })

    Promise.all([
      fetch(`${API}/pokemon/${id}`, { signal: controller.signal }).then((res) => res.json()),
      fetch(`${API}/pokemon-species/${id}`, { signal: controller.signal }).then((res) => res.json()),
    ])
      .then(([pokemon, species]) => {
        const flavor = species.flavor_text_entries.find((entry) => entry.language.name === 'en')
        const genus = species.genera.find((entry) => entry.language.name === 'en')
        setState({
          status: 'done',
          data: {
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            genus: genus?.genus ?? '',
            flavor: flavor ? flavor.flavor_text.replace(/[\f\n\r]+/g, ' ') : '',
          },
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null })
      })

    return () => controller.abort()
  }, [id])

  return state
}
