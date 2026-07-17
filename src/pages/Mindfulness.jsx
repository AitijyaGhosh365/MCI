import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '../context/ProgressContext.jsx'
import { relaxationVideos } from '../data/videos.js'

export default function Mindfulness() {
  const { logCompletion } = useProgress()
  const [breathing, setBreathing] = useState(false)
  const [label, setLabel] = useState('Breathe in...')
  const [loggedThisSession, setLoggedThisSession] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (breathing) {
      setLabel('Breathe in...')
      let phaseIn = true
      intervalRef.current = setInterval(() => {
        phaseIn = !phaseIn
        setLabel(phaseIn ? 'Breathe in...' : 'Breathe out...')
      }, 4000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [breathing])

  function finishSession() {
    setBreathing(false)
    if (!loggedThisSession) {
      logCompletion('mindfulness')
      setLoggedThisSession(true)
    }
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Guided Mindfulness</span>
        <h1>Slow down for a few minutes</h1>
        <p>Try the breathing exercise on its own, or play a video and follow along.</p>
      </div>

      <div className="game-panel" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="breathing-wrap">
          <div className="breathing-circle" data-breathing={breathing}>
            {breathing ? label : '🌿'}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {!breathing ? (
              <button className="btn btn-primary" onClick={() => { setBreathing(true); setLoggedThisSession(false) }}>
                Start breathing exercise
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={finishSession}>
                Finish session
              </button>
            )}
          </div>
        </div>
      </div>

      <h2 className="section-title">Guided videos</h2>
      <div className="video-grid">
        {relaxationVideos.map(v => (
          <div className="video-card" key={v.id}>
            <div className="video-frame-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-meta">
              <h4>{v.title}</h4>
              <p>{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
