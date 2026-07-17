import React, { createContext, useContext, useEffect, useState } from 'react'

const ProgressContext = createContext(null)
const PROGRESS_KEY = 'cogni_progress'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  const d1 = new Date(a + 'T00:00:00')
  const d2 = new Date(b + 'T00:00:00')
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24))
}

function defaultProgress() {
  return {
    streak: 0,
    lastActiveDate: null,
    totalCompleted: 0,
    byCategory: {
      games: 0,
      mindfulness: 0,
      social: 0,
      movement: 0
    }
  }
}

function loadProgress() {
  try {
    const stored = window.localStorage.getItem(PROGRESS_KEY)
    if (!stored) return defaultProgress()
    return { ...defaultProgress(), ...JSON.parse(stored) }
  } catch {
    return defaultProgress()
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch {
      /* localStorage unavailable — progress still works for this session */
    }
  }, [progress])

  // Call this whenever the person finishes any activity (a game round,
  // a breathing session, a social-play match, a movement video).
  function logCompletion(category) {
    setProgress(prev => {
      const today = todayStr()
      let streak = prev.streak
      if (prev.lastActiveDate === today) {
        // already logged today — streak unchanged
      } else if (prev.lastActiveDate && daysBetween(prev.lastActiveDate, today) === 1) {
        streak = prev.streak + 1
      } else {
        streak = 1
      }
      return {
        ...prev,
        streak,
        lastActiveDate: today,
        totalCompleted: prev.totalCompleted + 1,
        byCategory: {
          ...prev.byCategory,
          [category]: (prev.byCategory[category] || 0) + 1
        }
      }
    })
  }

  function resetProgress() {
    setProgress(defaultProgress())
  }

  const value = { progress, logCompletion, resetProgress }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
