// Marcação "feita a caneta" que se desenha sozinha em volta de um elemento
const PATHS = {
  circle: 'M10 30 C 4 12, 70 2, 160 5 C 230 8, 262 16, 254 28 C 246 40, 150 46, 70 42 C 18 40, 2 30, 14 16 C 22 8, 60 4, 96 5',
  underline: 'M4 44 C 50 38, 90 48, 140 42 S 220 38, 256 44',
}

function Scribble({ variant = 'circle', label, color, delay = 0, children }) {
  return (
    <div className={`scribble scribble--${variant}`} style={{ '--scribble-color': color, '--delay': `${delay}ms` }}>
      {children}
      <svg className="scribble__mark" viewBox="0 0 260 50" preserveAspectRatio="none" aria-hidden="true">
        <path d={PATHS[variant]} pathLength="1" />
      </svg>
      {label && <span className="scribble__label">{label}</span>}
    </div>
  )
}

export default Scribble
