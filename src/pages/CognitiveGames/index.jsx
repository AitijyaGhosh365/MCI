import React, { useState } from 'react'
import { FeatureCard } from '../../components/Cards.jsx'
import MemoryMatch from './MemoryMatch.jsx'
import SequenceRecall from './SequenceRecall.jsx'
import PatternSpotting from './PatternSpotting.jsx'

const GAMES = [
  { id: 'memory', icon: '🧠', tone: 'sage', title: 'Memory Match', description: 'Flip cards and find the matching pairs.' },
  { id: 'sequence', icon: '🔢', tone: 'sky', title: 'Sequence Recall', description: 'Watch the pattern, then play it back.' },
  { id: 'pattern', icon: '🔎', tone: 'coral', title: 'Pattern Spotting', description: 'Spot the tile that breaks the pattern.' }
]

export default function GamesHub() {
  const [active, setActive] = useState(null)

  if (active === 'memory') return <MemoryMatch onBack={() => setActive(null)} />
  if (active === 'sequence') return <SequenceRecall onBack={() => setActive(null)} />
  if (active === 'pattern') return <PatternSpotting onBack={() => setActive(null)} />

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Cognitive Games</span>
        <h1>Exercise memory, attention, and speed</h1>
        <p>A few minutes a day is enough — little and often works best.</p>
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
