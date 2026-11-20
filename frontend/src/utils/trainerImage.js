const TRAINER_SPRITES = 'https://play.pokemonshowdown.com/sprites/trainers'

// Nome do treinador no pokedex-data.json -> arquivo do sprite no Pokémon Showdown
const SPRITE_FILES = {
  Ash: 'ash',
  Brock: 'brock',
  Misty: 'misty',
  'Lt. Surge': 'ltsurge',
  Erika: 'erika',
  Koga: 'koga',
  Sabrina: 'sabrina',
  Blaine: 'blaine',
  Giovanni: 'giovanni',
  Gary: 'blue', // nos jogos o rival se chama Blue
  'Team Rocket': 'teamrocket',
  Lance: 'lance',
}

// Retorna a URL da imagem do treinador ou null se não houver sprite conhecido
export function getTrainerImage(name) {
  const file = SPRITE_FILES[name]
  return file ? `${TRAINER_SPRITES}/${file}.png` : null
}
