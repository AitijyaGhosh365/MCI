import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

const TILES = [
  { id: 0, tone: 'sage' },
  { id: 1, tone: 'sky' },
  { id: 2, tone: 'coral' },
  { id: 3, tone: 'cream' }
]

export default function SequenceRecall({ onBack }) {
  const { logCompletion } = useProgress()
  const [sequence, setSequence] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [litTile, setLitTile] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | showing | input | gameover
  const [level, setLevel] = useState(0)
  const [best, setBest] = useState(0)
  const loggedRef = useRef(false)

  function start() {
    loggedRef.current = false
    setSequence([Math.floor(Math.random() * 4)])
    setLevel(1)
    setPlayerIndex(0)
    setPhase('showing')
  }

  // Play back the current sequence whenever we enter "showing" phase
  useEffect(() => {
    if (phase !== 'showing' || sequence.length === 0) return
    let cancelled = false
    let i = 0

    function step() {
      if (cancelled) return
      if (i >= sequence.length) {
        setLitTile(null)
        setPhase('input')
        return
      }
      setLitTile(sequence[i])
      setTimeout(() => {
        if (cancelled) return
        setLitTile(null)
        setTimeout(() => {
          i += 1
          step()
        }, 250)
      }, 550)
    }
    const startTimer = setTimeout(step, 500)

    return () => {
      cancelled = true
      clearTimeout(startTimer)
    }
  }, [phase, sequence])

  function handleTileClick(tileId) {
    if (phase !== 'input') return
    if (tileId === sequence[playerIndex]) {
      if (playerIndex + 1 === sequence.length) {
        // round complete — grow the sequence
        setBest(b => Math.max(b, level))
        setSequence(prev => [...prev, Math.floor(Math.random() * 4)])
        setLevel(l => l + 1)
        setPlayerIndex(0)
        setPhase('showing')
      } else {
        setPlayerIndex(playerIndex + 1)
      }
    } else {
      setBest(b => Math.max(b, level))
      setPhase('gameover')
      if (!loggedRef.current) {
        loggedRef.current = true
        logCompletion('games')
      }
    }
  }

  return (
    <div>
      <button className="back-link" onClick={onBack}>← Back to games</button>
      <div className="page-header">
        <span className="eyebrow">Cognitive Games</span>
        <h1>Sequence Recall</h1>
        <p>Watch the tiles light up, then repeat the pattern in the same order.</p>
      </div>

      <div className="game-panel">
        <div className="game-toolbar">
          <span className="game-stat">Level: {level || '—'}</span>
          <span className="game-stat">Best: {best}</span>
          {phase === 'idle' || phase === 'gameover' ? (
            <button className="btn btn-primary" onClick={start}>
              {phase === 'gameover' ? 'Play again' : 'Start'}
            </button>
          ) : (
            <span className="game-stat">{phase === 'showing' ? 'Watch...' : 'Your turn'}</span>
          )}
        </div>

        {phase === 'gameover' && (
          <div className="topic-card" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            <h3>Good round!</h3>
            <p style={{ margin: 0 }}>You reached level {best}. Try again to beat it.</p>
          </div>
        )}

        <div className="simon-grid">
          {TILES.map(tile => (
            <button
              key={tile.id}
              className={`simon-tile ${tile.tone} ${litTile === tile.id ? 'lit' : ''}`}
              onClick={() => handleTileClick(tile.id)}
              disabled={phase !== 'input'}
              aria-label={`Tile ${tile.id + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
