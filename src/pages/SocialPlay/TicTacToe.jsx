import React, { useEffect, useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function calculateWinner(cells) {
  for (const [a,b,c] of LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a]
  }
  return null
}

export default function TicTacToe({ onBack }) {
  const { logCompletion } = useProgress()
  const [cells, setCells] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 })
  const [loggedThisRound, setLoggedThisRound] = useState(false)

  const winner = calculateWinner(cells)
  const isTie = !winner && cells.every(Boolean)

  useEffect(() => {
    if ((winner || isTie) && !loggedThisRound) {
      setLoggedThisRound(true)
      logCompletion('social')
      setScores(s => (winner ? { ...s, [winner]: s[winner] + 1 } : { ...s, ties: s.ties + 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, isTie])

  function handleClick(i) {
    if (cells[i] || winner || isTie) return
    const next = [...cells]
    next[i] = turn
    setCells(next)
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  function newRound() {
    setCells(Array(9).fill(null))
    setTurn('X')
    setLoggedThisRound(false)
  }

  return (
    <div>
      <button className="back-link" onClick={onBack}>← Back to social play</button>
      <div className="page-header">
        <span className="eyebrow">Social Play</span>
        <h1>Tic-Tac-Toe</h1>
        <p>Take turns on the same device — Player 1 is X, Player 2 is O.</p>
      </div>

      <div className="game-panel">
        <div className="game-toolbar">
          <span className="game-stat">X wins: {scores.X}</span>
          <span className="game-stat">O wins: {scores.O}</span>
          <span className="game-stat">Ties: {scores.ties}</span>
          <button className="btn btn-secondary" onClick={newRound}>New round</button>
        </div>

        <div className="turn-banner">
          {winner ? `${winner} wins this round! 🎉` : isTie ? "It's a tie!" : `${turn}'s turn`}
        </div>

        <div className="ttt-board">
          {cells.map((val, i) => (
            <button key={i} className="ttt-cell" onClick={() => handleClick(i)} aria-label={`Cell ${i + 1}, ${val || 'empty'}`}>
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
