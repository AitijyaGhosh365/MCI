import React, { useEffect, useState } from 'react'
import { useProgress } from '../context/ProgressContext.jsx'
import { movementVideos, movementPrompts } from '../data/videos.js'

export default function MovementMind() {
  const { logCompletion } = useProgress()
  const [promptIndex, setPromptIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [loggedThisSession, setLoggedThisSession] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setPromptIndex(i => (i + 1) % movementPrompts.length)
    }, 20000)
    return () => clearInterval(id)
  }, [running])

  function startSession() {
    setRunning(true)
    setPromptIndex(Math.floor(Math.random() * movementPrompts.length))
    setLoggedThisSession(false)
  }

  function finishSession() {
    setRunning(false)
    if (!loggedThisSession) {
      logCompletion('movement')
      setLoggedThisSession(true)
    }
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Movement + Mind</span>
        <h1>Move your body, work your mind</h1>
        <p>Start a video, follow along, and let the on-screen prompts give your mind something to do too.</p>
      </div>

      <div className="game-panel" style={{ marginBottom: 'var(--space-5)' }}>
        {running ? (
          <>
            <div className="prompt-ticker">{movementPrompts[promptIndex]}</div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-secondary" onClick={finishSession}>Finish session</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
              Start a session to get a new mental prompt every 20 seconds while you move.
            </p>
            <button className="btn btn-primary" onClick={startSession}>Start session</button>
          </div>
        )}
      </div>

      <h2 className="section-title">Videos to follow along with</h2>
      <div className="video-grid">
        {movementVideos.map(v => (
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
