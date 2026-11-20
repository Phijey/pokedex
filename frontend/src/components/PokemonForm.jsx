import { useEffect, useState } from 'react'
import { getTypeInfo } from '../utils/typeColors'
import '../css/PokemonForm.css'

const STAT_FIELDS = [
  ['hp', 'HP'],
  ['attack', 'Ataque'],
  ['defense', 'Defesa'],
  ['specialAttack', 'Atq. Especial'],
  ['specialDefense', 'Def. Especial'],
  ['speed', 'Velocidade'],
]

const MAX_TYPES = 2

const EMPTY_STATS = { hp: 50, attack: 50, defense: 50, specialAttack: 50, specialDefense: 50, speed: 50 }

// Formulário em modal usado para cadastrar (pokemon = null) e editar um Pokémon
function PokemonForm({ pokemon, types, onSubmit, onClose }) {
  const editing = Boolean(pokemon)
  const [name, setName] = useState(pokemon?.name ?? '')
  const [stats, setStats] = useState(pokemon?.stats ?? EMPTY_STATS)
  const [typeIds, setTypeIds] = useState(pokemon?.types.map((t) => t.id) ?? [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Pokémon "sem tipo" (Typeless) é representado por nenhuma seleção
  const selectableTypes = types.filter((t) => t.name !== 'Typeless')

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function toggleType(id) {
    setTypeIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      if (current.length >= MAX_TYPES) return current
      return [...current, id]
    })
  }

  function setStat(key, value) {
    setStats((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Informe o nome do Pokémon.')
      return
    }

    const payload = {
      name: trimmed,
      stats: Object.fromEntries(STAT_FIELDS.map(([key]) => [key, Number(stats[key])])),
      types: typeIds.map((id) => types.find((t) => t.id === id)).map(({ id, name: typeName }) => ({ id, name: typeName })),
    }

    setSaving(true)
    setError('')
    try {
      await onSubmit(payload)
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="pokemon-form"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-label={editing ? `Editar ${pokemon.name}` : 'Novo espécime'}
      >
        <button type="button" className="pokemon-form__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <h2 className="pokemon-form__title">{editing ? `Editar espécime nº ${pokemon.id}` : 'Novo espécime'}</h2>

        <label className="pokemon-form__field">
          <span>Nome</span>
          <input
            type="text"
            value={name}
            maxLength={30}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Pikachu"
            autoFocus
            required
          />
        </label>

        <fieldset className="pokemon-form__types">
          <legend>
            Tipos <small>(até {MAX_TYPES}; nenhum = sem tipo)</small>
          </legend>
          {selectableTypes.map((type) => {
            const selected = typeIds.includes(type.id)
            const blocked = !selected && typeIds.length >= MAX_TYPES
            return (
              <button
                key={type.id}
                type="button"
                className={`pokemon-form__type ${selected ? 'is-on' : ''}`}
                style={{ '--type-color': getTypeInfo(type.name).color }}
                onClick={() => toggleType(type.id)}
                disabled={blocked}
                aria-pressed={selected}
              >
                {getTypeInfo(type.name).label}
              </button>
            )
          })}
        </fieldset>

        <div className="pokemon-form__stats">
          {STAT_FIELDS.map(([key, label]) => (
            <label key={key} className="pokemon-form__field">
              <span>{label}</span>
              <input
                type="number"
                min="1"
                max="255"
                value={stats[key]}
                onChange={(event) => setStat(key, event.target.value)}
                required
              />
            </label>
          ))}
        </div>

        {error && (
          <p className="pokemon-form__error" role="alert">
            {error}
          </p>
        )}

        <div className="pokemon-form__actions">
          <button type="button" className="btn" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button type="submit" className="btn btn--on" disabled={saving}>
            {saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PokemonForm
