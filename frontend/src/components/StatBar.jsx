import { STAT_SCALE } from '../utils/stats'

function StatBar({ label, value, color, compact = false }) {
  const percent = Math.min(value / STAT_SCALE, 1) * 100

  return (
    <div className={`stat-bar ${compact ? 'stat-bar--compact' : ''}`}>
      <span className="stat-bar__label">{label}</span>
      <div className="stat-bar__track">
        <div className="stat-bar__fill" style={{ width: `${percent}%`, background: color }} />
      </div>
      <span className="stat-bar__value">{value}</span>
    </div>
  )
}

export default StatBar
