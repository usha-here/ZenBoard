import React, { useState } from 'react'
import './NeedInput.css'

const NeedInput = () => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const maxChars = 500

  const handleNext = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please tell us briefly what you need so we can help.')
      return
    }
    try { sessionStorage.setItem('healthNeed', text.trim()) } catch (e) { console.warn(e) }
    window.location.href = '/analyzing'
  }

  return (
    <div className="need-page">
      <div className="need-card" role="region" aria-labelledby="need-heading">
        <div className="need-header">
          <svg className="health-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" aria-hidden="true" focusable="false">
            <path fill="#06a6b5" d="M12 2a5 5 0 0 0-5 5v1H6a4 4 0 0 0-4 4v3a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-3a4 4 0 0 0-4-4h-1V7a5 5 0 0 0-5-5zM11 11H9v2H7v2h2v2h2v-2h2v-2h-2v-2z" />
          </svg>
          <h1 id="need-heading">Tell us about your health need</h1>
        </div>

        <form className="need-form" onSubmit={handleNext}>
          <label htmlFor="need-input" className="sr-only">Describe your health need</label>
          <textarea id="need-input" className="need-textarea" placeholder="I have tooth pain, what can I do?" value={text} onChange={(e)=>{setText(e.target.value); if (error) setError('')}} maxLength={maxChars} rows={6} aria-describedby="need-help need-count" />

          <div className="need-meta">
            <div id="need-help" className="help-text">Keep it short — we’ll ask clarifying questions next.</div>
            <div id="need-count" className="char-count">{text.length}/{maxChars}</div>
          </div>

          {error && <div className="error" role="alert">{error}</div>}

          <div className="actions"><button type="submit" className="next-btn">Next</button></div>
        </form>
      </div>
    </div>
  )
}

export default NeedInput
