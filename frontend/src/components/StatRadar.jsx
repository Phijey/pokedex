import { STATS, STAT_SCALE } from '../utils/stats'

// Gráfico radar hexagonal feito em SVG puro.
// series: [{ stats, color, label }] — permite sobrepor dois Pokémon na comparação.
function StatRadar({ series, size = 280 }) {
  const center = size / 2
  const radius = size / 2 - 42
  const rings = [0.25, 0.5, 0.75, 1]

  function point(index, ratio) {
    const angle = (Math.PI / 180) * (-90 + index * (360 / STATS.length))
    return [center + Math.cos(angle) * radius * ratio, center + Math.sin(angle) * radius * ratio]
  }

  function polygon(ratios) {
    return ratios.map((ratio, i) => point(i, ratio).join(',')).join(' ')
  }

  return (
    <svg className="radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Gráfico de atributos">
      {rings.map((ring) => (
        <polygon key={ring} className="radar__ring" points={polygon(STATS.map(() => ring))} />
      ))}

      {STATS.map((stat, i) => {
        const [x, y] = point(i, 1)
        const [lx, ly] = point(i, 1.22)
        const anchor = Math.abs(lx - center) < 4 ? 'middle' : lx > center ? 'start' : 'end'
        return (
          <g key={stat.key}>
            <line className="radar__axis" x1={center} y1={center} x2={x} y2={y} />
            <text className="radar__label" x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle">
              {stat.short}
            </text>
          </g>
        )
      })}

      {series.map((serie) => {
        const ratios = STATS.map((stat) => Math.min(serie.stats[stat.key] / STAT_SCALE, 1.08))
        return (
          <g key={serie.label} className="radar__serie">
            <polygon
              points={polygon(ratios)}
              fill={serie.color}
              fillOpacity="0.22"
              stroke={serie.color}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {ratios.map((ratio, i) => {
              const [x, y] = point(i, ratio)
              return <circle key={i} cx={x} cy={y} r="3.5" fill={serie.color} />
            })}
          </g>
        )
      })}
    </svg>
  )
}

export default StatRadar
