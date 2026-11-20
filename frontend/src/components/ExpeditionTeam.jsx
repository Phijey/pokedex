import { useMemo } from 'react'
import StatBar from './StatBar'
import StatRadar from './StatRadar'
import TypeStamp from './TypeStamp'
import { MAX_TEAM_SIZE } from '../hooks/useTeam'
import { STATS, formatId, totalStats } from '../utils/stats'
import { getArtwork, handleImageError } from '../utils/pokemonImage'
import { getPrimaryColor } from '../utils/typeColors'
import { getTypeMatchups } from '../utils/typeEffectiveness'
import '../css/ExpeditionTeam.css'

function ExpeditionTeam({ teamIds, pokemonById, allPokemon, onSelectPokemon, onRemove, onClear, onRandomize, onExplore }) {
  const members = useMemo(
    () => teamIds.map((id) => pokemonById.get(id)).filter(Boolean),
    [teamIds, pokemonById],
  )

  const analysis = useMemo(() => {
    if (members.length === 0) return null

    const avgStats = {}
    STATS.forEach(({ key }) => {
      const sum = members.reduce((acc, p) => acc + p.stats[key], 0)
      avgStats[key] = Math.round(sum / members.length)
    })

    const totalSum = members.reduce((acc, p) => acc + totalStats(p), 0)
    const avgTotal = Math.round(totalSum / members.length)

    const typeSet = new Set()
    const weakCount = new Map()

    members.forEach((p) => {
      if (p.types.length === 0) typeSet.add('Typeless')
      p.types.forEach((t) => typeSet.add(t.name))
      const { weaknesses } = getTypeMatchups(p.types)
      weaknesses.forEach(({ type }) => {
        weakCount.set(type, (weakCount.get(type) ?? 0) + 1)
      })
    })

    const sharedWeaknesses = [...weakCount.entries()]
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])

    return {
      avgStats,
      totalSum,
      avgTotal,
      coveredTypes: [...typeSet],
      sharedWeaknesses,
    }
  }, [members])

  const slots = Array.from({ length: MAX_TEAM_SIZE }, (_, index) => members[index] ?? null)

  return (
    <section className="expedition">
      <div className="expedition__intro">
        <p>
          Monte seu grupo de até {MAX_TEAM_SIZE} espécimes para a expedição e avalie o equilíbrio de atributos e tipos.
          <span> Use o botão ⚑ nas fichas para recrutar.</span>
        </p>
        <div className="expedition__actions">
          <button type="button" className="btn" onClick={() => onRandomize(allPokemon)}>
            ⚄ Sortear equipe
          </button>
          {members.length > 0 && (
            <button type="button" className="chip" onClick={onClear}>
              limpar equipe
            </button>
          )}
        </div>
      </div>

      <div className="expedition__slots">
        {slots.map((pokemon, index) =>
          pokemon ? (
            <article
              key={pokemon.id}
              className="expedition__card"
              style={{ '--type-color': getPrimaryColor(pokemon) }}
              onClick={() => onSelectPokemon(pokemon.id)}
            >
              <header className="expedition__card-top">
                <span className="expedition__slot-num">#{index + 1} · Nº {formatId(pokemon.id)}</span>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={(event) => {
                    event.stopPropagation()
                    onRemove(pokemon.id)
                  }}
                  title="Remover da equipe"
                  aria-label={`Remover ${pokemon.name} da equipe`}
                >
                  ×
                </button>
              </header>

              <div className="expedition__photo">
                <span className="expedition__tape" />
                <img
                  src={getArtwork(pokemon.id)}
                  alt={pokemon.name}
                  data-id={pokemon.id}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>

              <h3 className="expedition__name">{pokemon.name}</h3>

              <div className="expedition__types">
                {pokemon.types.length === 0 ? (
                  <TypeStamp name="Typeless" small />
                ) : (
                  pokemon.types.map((type) => <TypeStamp key={type.id} name={type.name} small />)
                )}
              </div>

              <footer className="expedition__footer">
                <span>total</span>
                <strong>{totalStats(pokemon)}</strong>
              </footer>
            </article>
          ) : (
            <div key={`empty-${index}`} className="expedition__empty">
              <span className="expedition__empty-num">vaga #{index + 1}</span>
              <p>Espaço livre na mochila de campo</p>
              <button type="button" className="chip" onClick={onExplore}>
                + escolher espécime
              </button>
            </div>
          ),
        )}
      </div>

      {analysis && (
        <div className="expedition__report">
          <div className="expedition__report-col">
            <h3 className="journal__section-title">Perfil médio da equipe</h3>
            <StatRadar series={[{ stats: analysis.avgStats, color: 'var(--accent)', label: 'Média da equipe' }]} />
            <div className="expedition__stats">
              {STATS.map((stat) => (
                <StatBar key={stat.key} label={stat.label} value={analysis.avgStats[stat.key]} color="var(--accent)" />
              ))}
            </div>
          </div>

          <div className="expedition__report-col">
            <h3 className="journal__section-title">Relatório de campo</h3>

            <dl className="expedition__summary">
              <div>
                <dt>integrantes</dt>
                <dd>
                  {members.length}/{MAX_TEAM_SIZE}
                </dd>
              </div>
              <div>
                <dt>média de atributos</dt>
                <dd>{analysis.avgTotal}</dd>
              </div>
              <div>
                <dt>poder somado</dt>
                <dd>{analysis.totalSum}</dd>
              </div>
            </dl>

            <div className="expedition__block">
              <span className="expedition__block-title">Tipos presentes na equipe ({analysis.coveredTypes.length})</span>
              <div className="expedition__stamps">
                {analysis.coveredTypes.map((type) => (
                  <TypeStamp key={type} name={type} small />
                ))}
              </div>
            </div>

            <div className="expedition__block">
              <span className="expedition__block-title">Alerta de vulnerabilidade compartilhada</span>
              {analysis.sharedWeaknesses.length > 0 ? (
                <div className="expedition__stamps">
                  {analysis.sharedWeaknesses.map(([type, count]) => (
                    <span key={type} className="expedition__weak-item">
                      <TypeStamp name={type} small />
                      <em>{count}×</em>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="expedition__note">
                  Nenhuma fraqueza elemental repetida entre os membros atuais.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ExpeditionTeam
