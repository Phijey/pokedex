import { useEffect, useState } from 'react'
import '../css/PencilCursor.css'

// Pequenos rabiscos que aparecem onde o usuário clica, como se o lápis marcasse o papel
const SCRIBBLES = [
  'M2 14 C 6 4, 10 4, 12 12 S 18 20, 22 8',
  'M2 10 L 8 16 L 12 6 L 18 16 L 22 8',
  'M12 4 C 4 4, 4 18, 12 18 C 20 18, 20 6, 13 7',
  'M3 12 Q 8 2 12 12 T 21 12',
]

let nextId = 0

function PencilCursor() {
  const [marks, setMarks] = useState([])

  useEffect(() => {
    // só faz sentido com mouse (em telas de toque não existe cursor)
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    function handlePointerDown(event) {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      const mark = {
        id: nextId++,
        x: event.clientX,
        y: event.clientY,
        path: SCRIBBLES[Math.floor(Math.random() * SCRIBBLES.length)],
        rotate: Math.round(Math.random() * 60 - 30),
      }
      setMarks((current) => [...current.slice(-6), mark])
      setTimeout(() => setMarks((current) => current.filter((m) => m.id !== mark.id)), 900)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <div className="pencil-marks" aria-hidden="true">
      {marks.map((mark) => (
        <svg
          key={mark.id}
          className="pencil-mark"
          viewBox="0 0 24 24"
          style={{ left: mark.x, top: mark.y, '--rotate': `${mark.rotate}deg` }}
        >
          <path d={mark.path} pathLength="1" />
        </svg>
      ))}
    </div>
  )
}

export default PencilCursor
