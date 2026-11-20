import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="10" r="6.5" />
        <path d="M15 15l5.5 5.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar Pokémon... (nome ou nº)"
        aria-label="Pesquisar Pokémon por nome ou número"
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange('')} aria-label="Limpar pesquisa">
          ×
        </button>
      )}
    </label>
  )
}

export default SearchBar
