import { useMemo, useState } from 'react'
import TrainerCard from './TrainerCard'
import '../css/Trainers.css'

// Agrupa os IDs repetidos (ex.: Koga possui três Koffing) e mantém a ordem original
function buildTeam(pokemonIds, pokemonById) {
  const counts = new Map()
  pokemonIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1))
  return [...counts.entries()]
    .filter(([id]) => pokemonById.has(id))
    .map(([id, count]) => ({ pokemon: pokemonById.get(id), count }))
}

const ORDERS = [
  { id: 'id', label: 'ordem original' },
  { id: 'name', label: 'nome' },
  { id: 'badges', label: 'insígnias' },
]

function Trainers({ trainers, pokemonById, onSelectPokemon }) {
  const [order, setOrder] = useState('id')

  const sorted = useMemo(() => {
    const list = [...trainers]
    if (order === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (order === 'badges') list.sort((a, b) => b.badges - a.badges || a.name.localeCompare(b.name))
    return list
  }, [trainers, order])

  return (
    <section className="trainers">
      <div className="trainers__intro">
        <p>
          Treinadores encontrados durante a expedição, suas insígnias e os Pokémon que os acompanham.
          <span> Clique em um Pokémon para abrir a ficha.</span>
        </p>
        <div className="trainers__order" role="group" aria-label="Ordenar treinadores">
          {ORDERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip ${order === item.id ? 'chip--on' : ''}`}
              onClick={() => setOrder(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="trainers__grid">
        {sorted.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            team={buildTeam(trainer.pokemonIds, pokemonById)}
            onSelectPokemon={onSelectPokemon}
          />
        ))}
      </div>
    </section>
  )
}

export default Trainers
