import React, { createContext, useContext, useEffect, useState } from 'react'

const ViewContext = createContext(null)

const VIEW_KEY = 'cogni_view'
const A11Y_KEY = 'cogni_a11y'

function loadView() {
  try {
    const stored = window.localStorage.getItem(VIEW_KEY)
    return stored === 'caregiver' ? 'caregiver' : 'patient'
  } catch {
    return 'patient'
  }
}

function loadA11y() {
  const defaults = { textSize: 'normal', highContrast: false, largeTouchTargets: false }
  try {
    const stored = window.localStorage.getItem(A11Y_KEY)
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    return defaults
  }
}

export function ViewProvider({ children }) {
  const [view, setView] = useState(loadView)
  const [a11y, setA11y] = useState(loadA11y)

  useEffect(() => {
    try {
      window.localStorage.setItem(VIEW_KEY, view)
    } catch {
      /* localStorage unavailable — view still works for this session */
    }
  }, [view])

  useEffect(() => {
    try {
      window.localStorage.setItem(A11Y_KEY, JSON.stringify(a11y))
    } catch {
      /* ignore */
    }
  }, [a11y])

  const bodyClasses = [
    a11y.textSize === 'large' ? 'text-size-large' : '',
    a11y.textSize === 'extra-large' ? 'text-size-extra-large' : '',
    a11y.highContrast ? 'theme-high-contrast' : '',
    a11y.largeTouchTargets ? 'large-touch-targets' : ''
  ].filter(Boolean).join(' ')

  const value = {
    view,
    isPatient: view === 'patient',
    isCaregiver: view === 'caregiver',
    setView,
    toggleView: () => setView(v => (v === 'patient' ? 'caregiver' : 'patient')),
    a11y,
    setA11y,
    bodyClasses
  }

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

export function useView() {
  const ctx = useContext(ViewContext)
  if (!ctx) throw new Error('useView must be used within ViewProvider')
  return ctx
}
