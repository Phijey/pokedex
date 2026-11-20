import { getTypeInfo } from '../utils/typeColors'

// Carimbo com o tipo do Pokémon. Vira botão quando recebe onClick (usado no filtro).
function TypeStamp({ name, onClick, active = false, small = false }) {
  const info = getTypeInfo(name)
  const tilt = ((name.length * 7) % 5) - 2
  const className = `stamp ${small ? 'stamp--small' : ''} ${active ? 'stamp--active' : ''}`
  const style = { '--stamp-color': info.color, '--tilt': `${tilt}deg` }

  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={onClick} aria-pressed={active}>
        {info.label}
      </button>
    )
  }

  return (
    <span className={className} style={style}>
      {info.label}
    </span>
  )
}

export default TypeStamp
