import React from 'react'
import { ExternalCard } from '../components/Cards.jsx'
import { LLM_CHATBOT_URL } from '../data/links.js'

export default function TalkToLLM() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Talk-to-LLM Companion</span>
        <h1>Have a conversation, any time</h1>
        <p>This opens our separate chatbot companion app in a new tab.</p>
      </div>

      <ExternalCard
        icon="💬"
        tone="sky"
        title="Open the Companion Chat"
        description="A friendly conversation partner you can talk to whenever you'd like — built and hosted as its own app."
        url={LLM_CHATBOT_URL}
        buttonLabel="Open chat companion"
      />
    </div>
  )
}
