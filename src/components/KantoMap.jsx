import { useState } from 'react'
import TrainerCard from './TrainerCard'
import { CITIES, FOREST, ISLAND_PATH, LAND_PATH, MOUNTAINS, ROUTES, TRAINER_SPOTS } from '../data/kantoMap'
import { buildTeam } from '../utils/trainers'
import { getTrainerImage } from '../utils/trainerImage'
import '../css/Trainers.css'
import '../css/KantoMap.css'

const CITY_BY_ID = new Map(CITIES.map((city) => [city.id, city]))

// Pequenas ondas espalhadas pelo mar
const WAVES = [
  [620, 590],
  [700, 540],
  [520, 600],
  [740, 610],
  [330, 610],
  [60, 540],
  [90, 610],
  [790, 470],
  [20, 40],
]

function TrainerPin({ trainer, spot, selected, index, onSelect }) {
  const city = CITY_BY_ID.get(spot.city)
  const photo = getTrainerImage(trainer.name)

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(trainer.id)
    }
  }

  return (
    <g
      className={`map-pin ${selected ? 'map-pin--selected' : ''}`}
      transform={`translate(${city.x + spot.dx} ${city.y})`}
      style={{ '--i': index }}
      onClick={() => onSelect(trainer.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${trainer.name} — ${spot.place}`}
    >
      <title>{trainer.name}</title>
      <g className="map-pin__drop">
      <g className="map-pin__body">
        <ellipse className="map-pin__shadow" cx="0" cy="2" rx="7" ry="2.5" />
        <line className="map-pin__needle" x1="0" y1="0" x2="0" y2="-26" />
        {selected && <circle className="map-pin__pulse" cx="0" cy="-48" r="24" />}
        <circle className="map-pin__frame" cx="0" cy="-48" r="22" />
        {photo ? (
          <image
            href={photo}
            x="-30"
            y="-74"
            width="60"
            height="60"
            clipPath="url(#pin-clip)"
            preserveAspectRatio="xMidYMin slice"
          />
        ) : (
          <text className="map-pin__initial" x="0" y="-41" textAnchor="middle">
            {trainer.name[0]}
          </text>
        )}
        <circle className="map-pin__head" cx="15" cy="-66" r="5" />
      </g>
      </g>
    </g>
  )
}

function KantoMap({ trainers, pokemonById, onSelectPokemon }) {
  const [selectedId, setSelectedId] = useState(trainers[0]?.id)
  const selected = trainers.find((t) => t.id === selectedId)
  const selectedSpot = selected ? TRAINER_SPOTS[selected.name] : null
  const placed = trainers.filter((t) => TRAINER_SPOTS[t.name])

  return (
    <section className="kanto">
      <p className="kanto__intro">
        Esboço da região feito durante a expedição.
        <span> Clique em um alfinete para ver quem foi encontrado ali.</span>
      </p>

      <div className="kanto__layout">
        <div className="kanto__paper">
          <svg className="kanto__map" viewBox="0 0 800 640" role="img" aria-label="Mapa de Kanto com os treinadores">
            <defs>
              {/* deixa os traços levemente tremidos, como desenho à mão */}
              <filter id="hand-drawn">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
              </filter>
              <pattern id="land-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="9" className="kanto__hatch" />
              </pattern>
              <clipPath id="pin-clip">
                <circle cx="0" cy="-48" r="19" />
              </clipPath>
            </defs>

            {WAVES.map(([x, y]) => (
              <path key={`${x}-${y}`} className="kanto__wave" d={`M${x - 14} ${y} q 7 -6 14 0 t 14 0`} />
            ))}

            <g filter="url(#hand-drawn)">
              <path className="kanto__land" d={LAND_PATH} />
              <path className="kanto__land-hatch" d={LAND_PATH} />
              <path className="kanto__coast" d={LAND_PATH} pathLength="1" />
              <path className="kanto__coast kanto__coast--echo" d={LAND_PATH} />
              <path className="kanto__land" d={ISLAND_PATH} />
              <path className="kanto__coast" d={ISLAND_PATH} pathLength="1" />

              {FOREST.map(([x, y]) => (
                <g key={`${x}-${y}`} className="kanto__tree" transform={`translate(${x} ${y})`}>
                  <path d="M0 -12 C 9 -12, 10 2, 0 2 C -10 2, -9 -12, 0 -12 Z" />
                  <line x1="0" y1="2" x2="0" y2="8" />
                </g>
              ))}

              {MOUNTAINS.map((m) => (
                <g key={`${m.x}-${m.y}`} className="kanto__mountain" transform={`translate(${m.x} ${m.y}) scale(${m.size})`}>
                  <path d="M-18 10 L-2 -16 L4 -6 L9 -12 L20 10" />
                  <path d="M-2 -16 L-6 -2 M4 -6 L2 4" className="kanto__mountain-shade" />
                </g>
              ))}

              {ROUTES.map((route, i) => (
                <path
                  key={route.id}
                  className={`kanto__route ${route.sea ? 'kanto__route--sea' : ''}`}
                  d={route.d}
                  pathLength={route.sea ? undefined : 1}
                  style={{ '--i': i }}
                />
              ))}
            </g>

            <text className="kanto__label kanto__label--feature" x="344" y="152">
              Mt. Moon
            </text>
            <text className="kanto__label kanto__label--feature" x="246" y="200" textAnchor="middle">
              Floresta Viridian
            </text>
            <text className="kanto__label kanto__label--sea" x="560" y="610">
              Mar de Kanto
            </text>

            {CITIES.map((city) => (
              <g key={city.id} className="kanto__city">
                <rect x={city.x - 8} y={city.y - 8} width="16" height="16" rx="3" transform={`rotate(8 ${city.x} ${city.y})`} />
                <text className="kanto__label" x={city.x + city.label[0]} y={city.y + city.label[1]} textAnchor="middle">
                  {city.name}
                </text>
              </g>
            ))}

            <g className="kanto__compass" transform="translate(720 70)">
              <circle r="30" />
              <path d="M0 -40 L7 0 L0 40 L-7 0 Z" />
              <path d="M-40 0 L0 6 L40 0 L0 -6 Z" className="kanto__compass-minor" />
              <text x="0" y="-46" textAnchor="middle">
                N
              </text>
            </g>

            {placed.map((trainer, index) => (
              <TrainerPin
                key={trainer.id}
                trainer={trainer}
                spot={TRAINER_SPOTS[trainer.name]}
                selected={trainer.id === selectedId}
                index={index}
                onSelect={setSelectedId}
              />
            ))}
          </svg>
        </div>

        <aside className="kanto__aside">
          <div className="kanto__chips" role="group" aria-label="Escolher treinador">
            {placed.map((trainer) => (
              <button
                key={trainer.id}
                type="button"
                className={`chip ${trainer.id === selectedId ? 'chip--on' : ''}`}
                onClick={() => setSelectedId(trainer.id)}
              >
                {trainer.name}
              </button>
            ))}
          </div>

          {selected && (
            <div className="kanto__detail" key={selected.id}>
              <p className="kanto__place">
                <span aria-hidden="true">📍</span> {selectedSpot?.place}
              </p>
              <TrainerCard
                trainer={selected}
                team={buildTeam(selected.pokemonIds, pokemonById)}
                onSelectPokemon={onSelectPokemon}
              />
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export default KantoMap
