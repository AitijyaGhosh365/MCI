import React, { useState } from 'react'
import { FeatureCard } from '../../components/Cards.jsx'
import TicTacToe from './TicTacToe.jsx'
import ConnectFour from './ConnectFour.jsx'

const GAMES = [
  { id: 'ttt', icon: '⭕', tone: 'sage', title: 'Tic-Tac-Toe', description: 'Classic pass-and-play, two players, one screen.' },
  { id: 'c4', icon: '🔴', tone: 'sky', title: 'Connect Four', description: 'Drop pieces and connect four in a row.' }
]

export default function SocialHub() {
  const [active, setActive] = useState(null)

  if (active === 'ttt') return <TicTacToe onBack={() => setActive(null)} />
  if (active === 'c4') return <ConnectFour onBack={() => setActive(null)} />

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Social Play</span>
        <h1>Play together, pass-and-play</h1>
        <p>Two people share one device, taking turns. No accounts, no matchmaking.</p>
      </div>
      <div className="card-grid">
        {GAMES.map(g => (
          <FeatureCard
            key={g.id}
            icon={g.icon}
            tone={g.tone}
            title={g.title}
            description={g.description}
            cta="Play"
            onClick={() => setActive(g.id)}
          />
        ))}
      </div>
    </div>
  )
}
