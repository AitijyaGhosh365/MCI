import React from 'react'

export function FeatureCard({ icon, tone = 'sage', title, description, cta = 'Open', onClick }) {
  return (
    <button className="feature-card" onClick={onClick}>
      <span className={`icon-badge ${tone}`} aria-hidden="true">{icon}</span>
      <h3> {title}</h3>
      <p>{description}</p>
      <span className="card-cta">{cta} →</span>
    </button>
  )
}

export function ExternalCard({ icon, tone = 'sage', title, description, url, buttonLabel }) {
  const ready = Boolean(url)
  return (
    <div className="external-card">
      <span className={`icon-badge ${tone}`} aria-hidden="true">{icon}</span>
      <div className="external-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button
        className="external-link-btn"
        disabled={!ready}
        onClick={() => ready && window.open(url, '_blank', 'noopener,noreferrer')}
      >
        {ready ? buttonLabel : 'Coming soon'}
      </button>
    </div>
  )
}
