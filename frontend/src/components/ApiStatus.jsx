// Tela exibida enquanto os dados chegam da API ou quando a requisição falha
function ApiStatus({ status, error, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="empty-state" role="status">
        <h2>Folheando o caderno…</h2>
        <p>Buscando os espécimes na API.</p>
      </div>
    )
  }

  return (
    <div className="empty-state" role="alert">
      <h2>Não foi possível abrir o caderno</h2>
      <p>{error}</p>
      <button type="button" className="btn" onClick={onRetry}>
        Tentar novamente
      </button>
    </div>
  )
}

export default ApiStatus
