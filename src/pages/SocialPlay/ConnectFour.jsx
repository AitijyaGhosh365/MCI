import React, { useEffect, useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

const ROWS = 6
const COLS = 7

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function checkWinner(board) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]]
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = board[r][c]
      if (!player) continue
      for (const [dr, dc] of dirs) {
        let count = 1
        let rr = r + dr, cc = c + dc
        while (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS && board[rr][cc] === player) {
          count++
          rr += dr
          cc += dc
        }
        if (count >= 4) return player
      }
    }
  }
  return null
}

export default function ConnectFour({ onBack }) {
  const { logCompletion } = useProgress()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState('p1')
  const [scores, setScores] = useState({ p1: 0, p2: 0 })
  const [loggedThisRound, setLoggedThisRound] = useState(false)

  const winner = checkWinner(board)
  const isFull = board.every(row => row.every(Boolean))

  useEffect(() => {
    if ((winner || isFull) && !loggedThisRound) {
      setLoggedThisRound(true)
      logCompletion('social')
      if (winner) setScores(s => ({ ...s, [winner]: s[winner] + 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, isFull])

  function dropPiece(col) {
    if (winner || isFull) return
    const newBoard = board.map(row => [...row])
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!newBoard[r][col]) {
        newBoard[r][col] = turn
        setBoard(newBoard)
        setTurn(turn === 'p1' ? 'p2' : 'p1')
        return
      }
    }
  }

  function newRound() {
    setBoard(emptyBoard())
    setTurn('p1')
    setLoggedThisRound(false)
  }

  return (
    <div>
      <button className="back-link" onClick={onBack}>← Back to social play</button>
      <div className="page-header">
        <span className="eyebrow">Social Play</span>
        <h1>Connect Four</h1>
        <p>Take turns dropping a piece. First to connect four — across, up-down, or diagonal — wins.</p>
      </div>

      <div className="game-panel" style={{ textAlign: 'center' }}>
        <div className="game-toolbar" style={{ justifyContent: 'center' }}>
          <span className="game-stat">Player 1: {scores.p1}</span>
          <span className="game-stat">Player 2: {scores.p2}</span>
          <button className="btn btn-secondary" onClick={newRound}>New round</button>
        </div>

        <div className="turn-banner">
          {winner
            ? `${winner === 'p1' ? 'Player 1' : 'Player 2'} connects four! 🎉`
            : isFull
              ? "Board's full — it's a tie!"
              : `${turn === 'p1' ? 'Player 1' : 'Player 2'}'s turn`}
        </div>

        <div className="c4-board" style={{ marginBottom: '4px', background: 'transparent', padding: '0 var(--space-2)' }}>
          {Array.from({ length: COLS }, (_, c) => (
            <button
              key={c}
              className="c4-col-btn"
              onClick={() => dropPiece(c)}
              aria-label={`Drop in column ${c + 1}`}
            >
              ↓
            </button>
          ))}
        </div>

        <div className="c4-board">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div key={`${r}-${c}`} className={`c4-cell ${cell || ''}`} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
