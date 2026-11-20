// Cores e rótulos em português para cada tipo presente no pokedex-data.json
export const TYPE_INFO = {
  Typeless: { label: 'Sem tipo', color: '#8a857a' },
  Normal: { label: 'Normal', color: '#9a8f7a' },
  Fire: { label: 'Fogo', color: '#d0532e' },
  Water: { label: 'Água', color: '#2f6fb0' },
  Grass: { label: 'Planta', color: '#4a8a3c' },
  Electric: { label: 'Elétrico', color: '#c99a0e' },
  Ice: { label: 'Gelo', color: '#4aa6b8' },
  Fighting: { label: 'Lutador', color: '#a3392f' },
  Poison: { label: 'Venenoso', color: '#8a4a9c' },
  Ground: { label: 'Terra', color: '#a87a3c' },
  Flying: { label: 'Voador', color: '#6f84c4' },
  Psychic: { label: 'Psíquico', color: '#cc4876' },
  Bug: { label: 'Inseto', color: '#7f9124' },
  Rock: { label: 'Pedra', color: '#8f7b4c' },
  Ghost: { label: 'Fantasma', color: '#5b4e8c' },
  Dark: { label: 'Sombrio', color: '#4b3f38' },
  Dragon: { label: 'Dragão', color: '#4f3fb0' },
  Steel: { label: 'Aço', color: '#71808c' },
}

export function getTypeInfo(name) {
  return TYPE_INFO[name] ?? TYPE_INFO.Typeless
}

// Cor principal de um Pokémon (primeiro tipo ou "sem tipo")
export function getPrimaryColor(pokemon) {
  const first = pokemon.types[0]
  return getTypeInfo(first ? first.name : 'Typeless').color
}
