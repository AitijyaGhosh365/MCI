import React, { useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

const PAIRS = [
  ['🍎', '🍏'],
  ['⭐', '✨'],
  ['🔵', '🟣'],
  ['🐦', '🐧'],
  ['☀️', '🌤️'],
  ['🍀', '🌿'],
  ['🔺', '🔻'],
  ['🟢', '🟩']
]

const GRID_SIZE = 12

function buildRound() {
  const [common, odd] = PAIRS[Math.floor(Math.random() * PAIRS.length)]
  const oddIndex = Math.floor(Math.random() * GRID_SIZE)
  const tiles = Array.from({ length: GRID_SIZE }, (_, i) => (i === oddIndex ? odd : common))
  return { tiles, oddIndex }
}

export default function PatternSpotting({ onBack }) {
  const { logCompletion } = useProgress()
  const [round, setRound] = useState(buildRound)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('playing') // playing | correct | gameover
  const [started, setStarted] = useState(false)

  function start() {
    setRound(buildRound())
    setScore(0)
    setStatus('playing')
    setStarted(true)
  }

  function handleClick(index) {
    if (status !== 'playing' || !started) return
    if (index === round.oddIndex) {
      setScore(s => s + 1)
      setStatus('correct')
      setTimeout(() => {
        setRound(buildRound())
        setStatus('playing')
      }, 500)
    } else {
      setStatus('gameover')
      logCompletion('games')
    }
  }

  return (
    <div>
      <button className="back-link" onClick={onBack}>← Back to games</button>
      <div className="page-header">
        <span className="eyebrow">Cognitive Games</span>
        <h1>Pattern Spotting</h1>
        <p>Find the one tile that's different from the rest.</p>
      </div>

      <div className="game-panel">
        <div className="game-toolbar">
          <span className="game-stat">Score: {score}</span>
          {!started || status === 'gameover' ? (
            <button className="btn btn-primary" onClick={start}>
              {status === 'gameover' ? 'Play again' : 'Start'}
            </button>
          ) : null}
        </div>

        {status === 'gameover' && (
          <div className="topic-card" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            <h3>Round over</h3>
            <p style={{ margin: 0 }}>You spotted {score} pattern{score === 1 ? '' : 's'} correctly.</p>
          </div>
        )}

        {started && (
          <div className="pattern-grid">
            {round.tiles.map((icon, i) => (
              <button key={i} className="pattern-tile" onClick={() => handleClick(i)} aria-label="Tile">
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
