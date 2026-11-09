import { formatId } from './stats'

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
