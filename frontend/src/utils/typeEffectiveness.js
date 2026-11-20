// Matriz de eficácia defensiva para os 17 tipos elementais do pokedex-data.json.
// Para cada tipo defensor, lista os tipos atacantes que causam dano dobrado (weak),
// reduzido pela metade (resist) ou nulo (immune).
const DEFENSE_CHART = {
  Normal: { weak: ['Fighting'], resist: [], immune: ['Ghost'] },
  Fire: {
    weak: ['Water', 'Ground', 'Rock'],
    resist: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel'],
    immune: [],
  },
  Water: {
    weak: ['Grass', 'Electric'],
    resist: ['Fire', 'Water', 'Ice', 'Steel'],
    immune: [],
  },
  Grass: {
    weak: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
    resist: ['Water', 'Grass', 'Electric', 'Ground'],
    immune: [],
  },
  Electric: {
    weak: ['Ground'],
    resist: ['Electric', 'Flying', 'Steel'],
    immune: [],
  },
  Ice: {
    weak: ['Fire', 'Fighting', 'Rock', 'Steel'],
    resist: ['Ice'],
    immune: [],
  },
  Fighting: {
    weak: ['Flying', 'Psychic'],
    resist: ['Bug', 'Rock', 'Dark'],
    immune: [],
  },
  Poison: {
    weak: ['Ground', 'Psychic'],
    resist: ['Grass', 'Fighting', 'Poison', 'Bug'],
    immune: [],
  },
  Ground: {
    weak: ['Water', 'Grass', 'Ice'],
    resist: ['Poison', 'Rock'],
    immune: ['Electric'],
  },
  Flying: {
    weak: ['Electric', 'Ice', 'Rock'],
    resist: ['Grass', 'Fighting', 'Bug'],
    immune: ['Ground'],
  },
  Psychic: {
    weak: ['Bug', 'Ghost', 'Dark'],
    resist: ['Fighting', 'Psychic'],
    immune: [],
  },
  Bug: {
    weak: ['Fire', 'Flying', 'Rock'],
    resist: ['Grass', 'Fighting', 'Ground'],
    immune: [],
  },
  Rock: {
    weak: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
    resist: ['Normal', 'Fire', 'Poison', 'Flying'],
    immune: [],
  },
  Ghost: {
    weak: ['Ghost', 'Dark'],
    resist: ['Poison', 'Bug'],
    immune: ['Normal', 'Fighting'],
  },
  Dark: {
    weak: ['Fighting', 'Bug'],
    resist: ['Ghost', 'Dark'],
    immune: ['Psychic'],
  },
  Dragon: {
    weak: ['Ice', 'Dragon'],
    resist: ['Fire', 'Water', 'Grass', 'Electric'],
    immune: [],
  },
  Steel: {
    weak: ['Fire', 'Fighting', 'Ground'],
    resist: ['Normal', 'Grass', 'Ice', 'Flying', 'Psychic', 'Bug', 'Rock', 'Dragon', 'Steel'],
    immune: ['Poison'],
  },
}

const ALL_ATTACK_TYPES = Object.keys(DEFENSE_CHART)

// Calcula fraquezas, resistências e imunidades combinadas de um Pokémon
export function getTypeMatchups(types) {
  if (!types || types.length === 0) {
    return { weaknesses: [], resistances: [], immunities: [] }
  }

  const multipliers = new Map(ALL_ATTACK_TYPES.map((type) => [type, 1]))

  types.forEach(({ name }) => {
    const chart = DEFENSE_CHART[name]
    if (!chart) return
    chart.weak.forEach((atk) => multipliers.set(atk, (multipliers.get(atk) ?? 1) * 2))
    chart.resist.forEach((atk) => multipliers.set(atk, (multipliers.get(atk) ?? 1) * 0.5))
    chart.immune.forEach((atk) => multipliers.set(atk, 0))
  })

  const weaknesses = []
  const resistances = []
  const immunities = []

  multipliers.forEach((mult, type) => {
    if (mult > 1) weaknesses.push({ type, mult })
    else if (mult === 0) immunities.push({ type, mult: 0 })
    else if (mult < 1) resistances.push({ type, mult })
  })

  weaknesses.sort((a, b) => b.mult - a.mult)
  resistances.sort((a, b) => a.mult - b.mult)

  return { weaknesses, resistances, immunities }
}

export function formatMultiplier(mult) {
  if (mult === 0.5) return '½×'
  if (mult === 0.25) return '¼×'
  return `${mult}×`
}
