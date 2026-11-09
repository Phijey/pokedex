function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''}`}
      onClick={onToggle}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDark ? 'Caderno (tema claro)' : 'Laboratório noturno (tema escuro)'}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__knob">{isDark ? '☾' : '☀'}</span>
      </span>
      <span className="theme-toggle__text">{isDark ? 'noturno' : 'diurno'}</span>
    </button>
  )
}

export default ThemeToggle
