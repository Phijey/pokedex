function EmptyState({ query, onReset }) {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 120 120" className="empty-state__art" aria-hidden="true">
        <path d="M38 20h44M42 20v14c-14 8-20 20-20 36 0 24 16 34 38 34s38-10 38-34c0-16-6-28-20-36V20" />
        <path d="M30 70c10 6 50 6 60 0" strokeDasharray="4 5" />
        <circle cx="52" cy="84" r="3" />
        <circle cx="68" cy="90" r="2" />
      </svg>
      <h2>Nenhum espécime encontrado</h2>
      <p>
        {query
          ? `Não há registros no caderno que correspondam a “${query}”.`
          : 'Não há registros no caderno para os filtros selecionados.'}
      </p>
      {onReset && (
        <button type="button" className="btn" onClick={onReset}>
          Limpar filtros
        </button>
      )}
    </div>
  )
}

export default EmptyState
