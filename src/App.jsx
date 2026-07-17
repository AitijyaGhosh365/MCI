import React, { useState } from 'react'
import { ViewProvider, useView } from './context/ViewContext.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import Header from './components/Header.jsx'
import AccessibilityWidget from './components/AccessibilityWidget.jsx'

import Home from './pages/Home.jsx'
import GamesHub from './pages/CognitiveGames/index.jsx'
import Mindfulness from './pages/Mindfulness.jsx'
import SocialHub from './pages/SocialPlay/index.jsx'
import MovementMind from './pages/MovementMind.jsx'
import Psychoeducation from './pages/Psychoeducation.jsx'
import TalkToLLM from './pages/TalkToLLM.jsx'
import MusicTherapy from './pages/MusicTherapy.jsx'

function Shell() {
  const [page, setPage] = useState('home')
  const { bodyClasses } = useView()

  function renderPage() {
    switch (page) {
      case 'home': return <Home setPage={setPage} />
      case 'games': return <GamesHub />
      case 'mindfulness': return <Mindfulness />
      case 'social': return <SocialHub />
      case 'movement': return <MovementMind />
      case 'learn': return <Psychoeducation />
      case 'talk': return <TalkToLLM />
      case 'music': return <MusicTherapy />
      default: return <Home setPage={setPage} />
    }
  }

  return (
    <div className={`app-shell ${bodyClasses}`}>
      <Header page={page} setPage={setPage} />
      <main className="app-main">
        {renderPage()}
      </main>
      <footer className="app-footer">
        CogniCompanion is a support tool for daily routine and engagement — it does not diagnose or replace medical care.
      </footer>
      <AccessibilityWidget />
    </div>
  )
}

export default function App() {
  return (
    <ViewProvider>
      <ProgressProvider>
        <Shell />
      </ProgressProvider>
    </ViewProvider>
  )
}
