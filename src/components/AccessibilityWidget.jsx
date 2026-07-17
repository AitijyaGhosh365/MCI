import React, { useState } from 'react'
import { useView } from '../context/ViewContext.jsx'

export default function AccessibilityWidget() {
  const { a11y, setA11y } = useView()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="a11y-fab"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="accessibility-widget-panel"
        aria-label="Accessibility settings"
        title="Accessibility settings"
      >
        ⚙
      </button>

      {open && (
        <div id="accessibility-widget-panel" role="dialog" aria-label="Accessibility settings">
          <h3>Display settings</h3>

          <div className="a11y-row">
            <label>Text size</label>
            <div className="grid">
              <button
                className={a11y.textSize === 'normal' ? 'active' : ''}
                onClick={() => setA11y(s => ({ ...s, textSize: 'normal' }))}
              >
                <span className="text-sm">Aa</span>
              </button>
              <button
                className={a11y.textSize === 'large' ? 'active' : ''}
                onClick={() => setA11y(s => ({ ...s, textSize: 'large' }))}
              >
                <span className="text-sm">Aa</span>
              </button>
              <button
                className={a11y.textSize === 'extra-large' ? 'active' : ''}
                onClick={() => setA11y(s => ({ ...s, textSize: 'extra-large' }))}
              >
                <span className="text-base">Aa</span>
              </button>
            </div>
          </div>

          <div className="a11y-row toggle-row">
            <label htmlFor="hc-toggle">High contrast</label>
            <input
              id="hc-toggle"
              type="checkbox"
              checked={a11y.highContrast}
              onChange={e => setA11y(s => ({ ...s, highContrast: e.target.checked }))}
            />
          </div>

          <div className="a11y-row toggle-row" style={{ marginBottom: 0 }}>
            <label htmlFor="touch-toggle">Larger buttons</label>
            <input
              id="touch-toggle"
              type="checkbox"
              checked={a11y.largeTouchTargets}
              onChange={e => setA11y(s => ({ ...s, largeTouchTargets: e.target.checked }))}
            />
          </div>
        </div>
      )}
    </>
  )
}
