import React from 'react'
import { ExternalCard } from '../components/Cards.jsx'
import { MUSIC_THERAPY_URL } from '../data/links.js'

export default function MusicTherapy() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Music Therapy</span>
        <h1>Music, chosen for how it makes you feel</h1>
        <p>This opens our separate music therapy app in a new tab.</p>
      </div>

      <ExternalCard
        icon="🎵"
        tone="coral"
        title="Open Music Therapy"
        description="Familiar and calming music sessions, built and hosted as its own app."
        url={MUSIC_THERAPY_URL}
        buttonLabel="Open music therapy"
      />
    </div>
  )
}
