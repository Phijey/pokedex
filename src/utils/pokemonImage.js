const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export function getArtwork(id) {
  return `${SPRITES}/other/official-artwork/${id}.png`
}

export function getSprite(id) {
  return `${SPRITES}/${id}.png`
}

// Ilustração usada caso a imagem externa não carregue
export const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="44" fill="none" stroke="#8a857a" stroke-width="3" stroke-dasharray="6 6"/>
      <text x="60" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="#8a857a">?</text>
    </svg>`,
  )

export function handleImageError(event) {
  const img = event.currentTarget
  if (img.dataset.fallback === 'sprite') {
    img.src = FALLBACK_IMAGE
    img.dataset.fallback = 'done'
  } else if (!img.dataset.fallback) {
    img.src = getSprite(img.dataset.id)
    img.dataset.fallback = 'sprite'
  }
}
