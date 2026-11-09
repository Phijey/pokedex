import TypeStamp from './TypeStamp'

function TypeFilter({ types, selected, onSelect }) {
  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      <span className="type-filter__label">tipo:</span>
      <button
        type="button"
        className={`type-filter__all ${selected === 'all' ? 'type-filter__all--active' : ''}`}
        onClick={() => onSelect('all')}
      >
        Todos
      </button>
      {types.map((type) => (
        <TypeStamp
          key={type.id}
          name={type.name}
          active={selected === type.name}
          onClick={() => onSelect(selected === type.name ? 'all' : type.name)}
        />
      ))}
    </div>
  )
}

export default TypeFilter
