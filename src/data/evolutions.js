// Famílias evolutivas dos Pokémon da região de Kanto (IDs de 1 a 151).
// Cada entrada é uma lista de estágios; um estágio pode conter múltiplos IDs
// quando há evolução ramificada (como Eevee → Vaporeon, Jolteon e Flareon).
export const EVOLUTION_FAMILIES = [
  [[1], [2], [3]],
  [[4], [5], [6]],
  [[7], [8], [9]],
  [[10], [11], [12]],
  [[13], [14], [15]],
  [[16], [17], [18]],
  [[19], [20]],
  [[21], [22]],
  [[23], [24]],
  [[25], [26]],
  [[27], [28]],
  [[29], [30], [31]],
  [[32], [33], [34]],
  [[35], [36]],
  [[37], [38]],
  [[39], [40]],
  [[41], [42]],
  [[43], [44], [45]],
  [[46], [47]],
  [[48], [49]],
  [[50], [51]],
  [[52], [53]],
  [[54], [55]],
  [[56], [57]],
  [[58], [59]],
  [[60], [61], [62]],
  [[63], [64], [65]],
  [[66], [67], [68]],
  [[69], [70], [71]],
  [[72], [73]],
  [[74], [75], [76]],
  [[77], [78]],
  [[79], [80]],
  [[81], [82]],
  [[84], [85]],
  [[86], [87]],
  [[88], [89]],
  [[90], [91]],
  [[92], [93], [94]],
  [[96], [97]],
  [[98], [99]],
  [[100], [101]],
  [[102], [103]],
  [[104], [105]],
  [[109], [110]],
  [[111], [112]],
  [[116], [117]],
  [[118], [119]],
  [[120], [121]],
  [[129], [130]],
  [[133], [134, 135, 136]],
  [[138], [139]],
  [[140], [141]],
  [[147], [148], [149]],
]

const FAMILY_BY_ID = new Map()
EVOLUTION_FAMILIES.forEach((stages) => {
  stages.forEach((stageIds) => {
    stageIds.forEach((id) => FAMILY_BY_ID.set(id, stages))
  })
})

export function getEvolutionStages(pokemonId, pokemonById) {
  const stages = FAMILY_BY_ID.get(pokemonId)
  if (!stages || !pokemonById) return []
  return stages.map((stageIds) => stageIds.map((id) => pokemonById.get(id)).filter(Boolean)).filter((s) => s.length > 0)
}
