import { useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import './css/App.css'

const TABS = [{ id: 'pokedex', label: 'Espécimes', icon: '❦' }]

function App() {
  const [view, setView] = useState('pokedex')

  return (
    <div className="app">
      <Header tabs={TABS} view={view} onViewChange={setView} total={data.pokemon.length} />

      <main>
        <p className="result-count">
          Exibindo <strong>{data.pokemon.length}</strong> espécimes
        </p>
        <PokemonList pokemons={data.pokemon} onSelect={() => {}} />
      </main>
    </div>
  )
}

export default App
