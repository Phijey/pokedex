import { useEffect, useId, useState } from 'react'

const MAX_LENGTH = 280

// Área de anotações pessoais: o texto é salvo automaticamente após uma pequena pausa na digitação
function NotePad({ pokemonName, value, onSave }) {
  const id = useId()
  const [draft, setDraft] = useState(value)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (draft === value) return undefined
    setStatus('typing')
    const timer = setTimeout(() => {
      onSave(draft)
      setStatus('saved')
    }, 600)
    return () => clearTimeout(timer)
  }, [draft, value, onSave])

  return (
    <div className="notepad">
      <div className="notepad__header">
        <label htmlFor={id}>Minhas anotações</label>
        <span className={`notepad__status notepad__status--${status}`}>
          {status === 'typing' && 'escrevendo...'}
          {status === 'saved' && 'salvo ✓'}
        </span>
      </div>
      <textarea
        id={id}
        className="notepad__text"
        value={draft}
        maxLength={MAX_LENGTH}
        rows={3}
        placeholder={`Escreva algo sobre ${pokemonName}...`}
        onChange={(event) => setDraft(event.target.value)}
      />
      <span className="notepad__count">
        {draft.length}/{MAX_LENGTH}
      </span>
    </div>
  )
}

export default NotePad
