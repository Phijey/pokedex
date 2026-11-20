export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATQ' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'A.ESP' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'D.ESP' },
  { key: 'speed', label: 'Velocidade', short: 'VEL' },
]

// Valor usado como 100% nas barras e no gráfico radar
export const STAT_SCALE = 180

export function totalStats(pokemon) {
  return STATS.reduce((sum, stat) => sum + pokemon.stats[stat.key], 0)
}

export function formatId(id) {
  return String(id).padStart(3, '0')
}

// Atributo mais alto e mais baixo (usados nas marcações à mão do modal)
export function getExtremes(pokemon) {
  let strongest = STATS[0].key
  let weakest = STATS[0].key
  STATS.forEach(({ key }) => {
    if (pokemon.stats[key] > pokemon.stats[strongest]) strongest = key
    if (pokemon.stats[key] < pokemon.stats[weakest]) weakest = key
  })
  return { strongest, weakest: weakest === strongest ? null : weakest }
}
