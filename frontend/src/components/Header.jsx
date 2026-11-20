import '../css/Header.css'

function Header({ tabs, view, onViewChange, total, children }) {
  return (
    <header className="masthead">
      <div className="masthead__top">
        <div className="masthead__brand">
          <span className="masthead__kicker">Pokédex · Região de Kanto</span>
          <h1>
            Caderno <em>de</em> Campo
          </h1>
          <p className="masthead__note">registro de {total} espécimes observados</p>
        </div>
        <div className="masthead__tools">{children}</div>
      </div>

      <nav className="tabs" aria-label="Seções">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tabs__tab ${view === tab.id ? 'tabs__tab--active' : ''}`}
            onClick={() => onViewChange(tab.id)}
          >
            <span className="tabs__icon" aria-hidden="true">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
