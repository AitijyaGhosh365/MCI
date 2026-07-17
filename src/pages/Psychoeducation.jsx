import React from 'react'
import { useView } from '../context/ViewContext.jsx'
import { patientTopics, caregiverTopics } from '../data/psychoeducation.js'

export default function Psychoeducation() {
  const { isCaregiver } = useView()
  const topics = isCaregiver ? caregiverTopics : patientTopics

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Brain Health</span>
        <h1>{isCaregiver ? 'Guidance for supporting brain health' : 'Simple tips for a healthier brain'}</h1>
        <p>
          {isCaregiver
            ? 'Background and practical guidance you can use day to day. This is educational content, not medical advice.'
            : 'A few small habits, practiced regularly, can make a real difference.'}
        </p>
      </div>

      <div className="card-grid">
        {topics.map(topic => (
          <div className="topic-card" key={topic.title}>
            <h3><span aria-hidden="true">{topic.icon}</span> {topic.title}</h3>
            <ul>
              {topic.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
