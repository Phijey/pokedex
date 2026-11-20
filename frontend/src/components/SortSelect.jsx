import { STATS } from '../utils/stats'

export const SORT_OPTIONS = [
  { id: 'id', label: 'Número' },
  { id: 'name', label: 'Nome' },
  ...STATS.map((stat) => ({ id: stat.key, label: stat.label })),
  { id: 'total', label: 'Total de atributos' },
]

function SortSelect({ sortBy, direction, onSortChange, onDirectionChange }) {
  return (
    <div className="sort">
      <label className="sort__label" htmlFor="sort-select">
        ordenar por
      </label>
      <select id="sort-select" className="sort__select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="icon-btn sort__dir"
        onClick={() => onDirectionChange(direction === 'asc' ? 'desc' : 'asc')}
        title={direction === 'asc' ? 'Crescente' : 'Decrescente'}
        aria-label={direction === 'asc' ? 'Ordem crescente' : 'Ordem decrescente'}
      >
        {direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}

export default SortSelect
