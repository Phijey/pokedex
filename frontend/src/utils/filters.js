import { formatId, totalStats } from './stats'

// Normaliza o texto digitado: remove espaços, "#", "nº" e acentos
function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^(#|n[o°º]\.?)\s*(?=\d)/, '')
}

export function matchesQuery(pokemon, query) {
  const term = normalize(query)
  if (!term) return true

  if (/^\d+$/.test(term)) {
    const number = String(Number(term))
    return String(pokemon.id).startsWith(number) || formatId(pokemon.id).startsWith(term)
  }

  return normalize(pokemon.name).includes(term)
}

export function matchesType(pokemon, type) {
  if (type === 'all') return true
  if (type === 'Typeless') return pokemon.types.length === 0
  return pokemon.types.some((t) => t.name === type)
}

function sortValue(pokemon, sortBy) {
  if (sortBy === 'id') return pokemon.id
  if (sortBy === 'name') return pokemon.name
  if (sortBy === 'total') return totalStats(pokemon)
  return pokemon.stats[sortBy]
}

export function sortPokemons(list, sortBy, direction) {
  const factor = direction === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const va = sortValue(a, sortBy)
    const vb = sortValue(b, sortBy)
    const result = typeof va === 'string' ? va.localeCompare(vb) : va - vb
    return (result || a.id - b.id) * factor
  })
}
