import React, { useEffect, useState } from 'react'
import './Analyzing.css'

const categories = ['Dental', 'Mental Health', 'Vision', 'Pharmacy', 'Primary Care', 'Other']

const Analyzing = () => {
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState('')

  useEffect(()=>{
    let mounted = true
    const ticks = [8, 22, 45, 72, 92]
    let i = 0
    const interval = setInterval(()=>{
      if (!mounted) return
      setProgress(ticks[i] || 95)
      i += 1
    }, 420)

    const run = async ()=>{
      const need = sessionStorage.getItem('healthNeed') || ''
      try {
        const resp = await fetch('http://localhost:3001/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: need })
        })
        const data = await resp.json()
        if (!mounted) return
        clearInterval(interval)
        setProgress(100)
        const result = (data && data.category) ? data.category : 'Other'
        setTimeout(()=>{
          setLabel(result)
          try { sessionStorage.setItem('healthCategory', result) } catch(e){}
          setTimeout(()=>{ window.location.href = '/dashboard' }, 900)
        }, 400)
      } catch (err) {
        console.error('classification error', err)
        if (!mounted) return
        clearInterval(interval)
        setProgress(100)
        setLabel('Other')
        setTimeout(()=>{ window.location.href = '/dashboard' }, 900)
      }
    }

    run()

    return ()=>{ mounted = false; clearInterval(interval) }
  },[])

  return (
    <div className="analyzing-page">
      <div className="analyzing-card">
        <h2>Analyzing your health need...</h2>
        <p className="muted">We’re classifying your request to surface the best benefits and next steps.</p>

        <div className="progress-wrap" aria-hidden>
          <div className="progress-bar" style={{width:`${progress}%`}} />
        </div>

        <div className="progress-row">
          <div className="step-indicator">Step 2 of 4</div>
          <div className="percent">{progress}%</div>
        </div>

        <div className="status">
          <div className="spinner" aria-hidden />
          <div className="status-text">
            {label ? `Classified as: ${label}` : 'Processing…'}
          </div>
        </div>

        <div className="reassure">This usually takes a few seconds. We prioritize accuracy and privacy.</div>
      </div>
    </div>
  )
}

export default Analyzing
