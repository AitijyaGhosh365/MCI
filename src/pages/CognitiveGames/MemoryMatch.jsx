import React, { useEffect, useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

const ICON_SET = ['🍎', '🌻', '🐢', '☀️', '🎵', '🍀', '⭐', '🐦']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function newDeck() {
  return shuffle([...ICON_SET, ...ICON_SET]).map((icon, i) => ({
    id: i,
    icon,
    revealed: false,
    matched: false
  }))
}

export default function MemoryMatch({ onBack }) {
  const { logCompletion } = useProgress()
  const [deck, setDeck] = useState(newDeck)
  const [selected, setSelected] = useState([])
  const [moves, setMoves] = useState(0)
  const [done, setDone] = useState(false)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (deck.every(c => c.matched)) {
      if (!done) {
        setDone(true)
        logCompletion('games')
      }
    }
  }, [deck, done, logCompletion])

  function handleFlip(card) {
    if (locked || card.revealed || card.matched || selected.length === 2) return
    const updated = deck.map(c => (c.id === card.id ? { ...c, revealed: true } : c))
    const nowSelected = [...selected, card.id]
    setDeck(updated)
    setSelected(nowSelected)

    if (nowSelected.length === 2) {
      setMoves(m => m + 1)
      setLocked(true)
      const [firstId, secondId] = nowSelected
      const first = updated.find(c => c.id === firstId)
      const second = updated.find(c => c.id === secondId)

      setTimeout(() => {
        setDeck(prev => prev.map(c => {
          if (c.id === firstId || c.id === secondId) {
            const isMatch = first.icon === second.icon
            return { ...c, matched: isMatch, revealed: isMatch }
          }
          return c
        }))
        setSelected([])
        setLocked(false)
      }, 700)
    }
  }

  function restart() {
    setDeck(newDeck())
    setSelected([])
    setMoves(0)
    setDone(false)
    setLocked(false)
  }

  return (
    <div>
      <button className="back-link" onClick={onBack}>← Back to games</button>
      <div className="page-header">
        <span className="eyebrow">Cognitive Games</span>
        <h1>Memory Match</h1>
        <p>Find every matching pair. Take your time — there's no clock.</p>
      </div>

      <div className="game-panel">
        <div className="game-toolbar">
          <span className="game-stat">Moves: {moves}</span>
          <button className="btn btn-secondary" onClick={restart}>New game</button>
        </div>

        {done && (
          <div className="topic-card" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            <h3>🎉 Nicely done!</h3>
            <p style={{ margin: 0 }}>You matched every pair in {moves} moves.</p>
          </div>
        )}

        <div className="memory-grid">
          {deck.map(card => (
            <button
              key={card.id}
              className={`memory-tile ${card.matched ? 'matched' : card.revealed ? 'revealed' : ''}`}
              onClick={() => handleFlip(card)}
              aria-label={card.revealed || card.matched ? `Card showing ${card.icon}` : 'Hidden card'}
            >
              {card.revealed || card.matched ? card.icon : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
