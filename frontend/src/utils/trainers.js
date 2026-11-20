// Agrupa os IDs repetidos (ex.: Koga possui três Venonat) e mantém a ordem original
export function buildTeam(pokemonIds, pokemonById) {
  const counts = new Map()
  pokemonIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1))
  return [...counts.entries()]
    .filter(([id]) => pokemonById.has(id))
    .map(([id, count]) => ({ pokemon: pokemonById.get(id), count }))
}
