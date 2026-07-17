import React from 'react'
import { useView } from '../context/ViewContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { FeatureCard } from '../components/Cards.jsx'

const QUICK_LINKS = [
  { id: 'games', icon: '🧩', tone: 'sage', title: 'Cognitive Games', description: 'Memory, sequence, and pattern exercises.' },
  { id: 'mindfulness', icon: '🌿', tone: 'sky', title: 'Guided Relaxation', description: 'Breathing and calming sessions.' },
  { id: 'social', icon: '🎲', tone: 'coral', title: 'Social Play', description: 'Pass-and-play games with someone else.' },
  { id: 'movement', icon: '🤸', tone: 'sage', title: 'Movement + Mind', description: 'Gentle movement with mental prompts.' }
]

export default function Home({ setPage }) {
  const { isCaregiver } = useView()
  const { progress } = useProgress()

  return (
    <div>
      <div className="hero-panel">
        <div>
          <h1>{isCaregiver ? 'Caregiver overview' : 'Welcome back'}</h1>
          <p>
            {isCaregiver
              ? "Here's a quick look at engagement so far. Consistency matters more than any single session."
              : 'Pick something to do today — even a few minutes helps.'}
          </p>
        </div>
        <div className="streak-badge">
          <span className="streak-number mono">{progress.streak}</span>
          <span className="streak-label">Day streak</span>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-tile">
          <div className="stat-value mono">{progress.totalCompleted}</div>
          <div className="stat-label">Total completed</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value mono">{progress.byCategory.games}</div>
          <div className="stat-label">Games played</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value mono">{progress.byCategory.mindfulness}</div>
          <div className="stat-label">Relaxation sessions</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value mono">{progress.byCategory.social}</div>
          <div className="stat-label">Social play rounds</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value mono">{progress.byCategory.movement}</div>
          <div className="stat-label">Movement sessions</div>
        </div>
      </div>

      {isCaregiver && (
        <div className="topic-card" style={{ marginBottom: 'var(--space-5)' }}>
          <h3>🩺 A note on this data</h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            These counts are simple engagement tallies stored only in this browser — not a clinical
            measure. A dip in streak is common and not by itself a cause for concern; look for
            trends over weeks rather than single days. See Brain Health for guidance on when to
            involve a clinician.
          </p>
        </div>
      )}

      <h2 className="section-title">Jump back in</h2>
      <div className="card-grid">
        {QUICK_LINKS.map(item => (
          <FeatureCard
            key={item.id}
            icon={item.icon}
            tone={item.tone}
            title={item.title}
            description={item.description}
            cta="Start"
            onClick={() => setPage(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
