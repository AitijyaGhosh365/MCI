import React from 'react'
import { useView } from '../context/ViewContext.jsx'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'games', label: 'Cognitive Games', icon: '🧩' },
  { id: 'mindfulness', label: 'Relaxation', icon: '🌿' },
  { id: 'social', label: 'Social Play', icon: '🎲' },
  { id: 'movement', label: 'Movement + Mind', icon: '🤸' },
  { id: 'learn', label: 'Brain Health', icon: '📖' },
  { id: 'talk', label: 'Talk Companion', icon: '💬' },
  { id: 'music', label: 'Music Therapy', icon: '🎵' }
]

export default function Header({ page, setPage }) {
  const { view, setView } = useView()

  return (
    <>
      <header className="app-header">
        <button
          className="brand"
          onClick={() => setPage('home')}
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          aria-label="Go to CogniCompanion home"
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C7 3 3 6.8 3 11.2c0 2.6 1.4 4.9 3.6 6.4V21l3.2-1.8c.7.15 1.4.2 2.2.2 5 0 9-3.8 9-8.2S17 3 12 3z" fill="white" fillOpacity="0.9"/>
              <circle cx="9" cy="11" r="1.2" fill="#4a5d50"/>
              <circle cx="15" cy="11" r="1.2" fill="#4a5d50"/>
            </svg>
          </span>
          <span>
            <span className="brand-name">CogniCompanion</span>
            <span className="brand-tagline">Daily support for a sharper mind</span>
          </span>
        </button>

        <div className="header-right">
          <div className="view-toggle" role="tablist" aria-label="Switch between patient and caregiver view">
            <button
              role="tab"
              aria-selected={view === 'patient'}
              className={view === 'patient' ? 'active patient' : ''}
              onClick={() => setView('patient')}
            >
              Patient view
            </button>
            <button
              role="tab"
              aria-selected={view === 'caregiver'}
              className={view === 'caregiver' ? 'active caregiver' : ''}
              onClick={() => setView('caregiver')}
            >
              Caregiver view
            </button>
          </div>
        </div>
      </header>

      <nav className="app-nav" aria-label="Main sections">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={page === item.id ? 'active' : ''}
            onClick={() => setPage(item.id)}
            aria-current={page === item.id ? 'page' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </>
  )
}
