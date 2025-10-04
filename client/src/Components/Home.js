import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">ZenBoard</h1>
          <p className="hero-sub">AI-driven Healthcare & Wellness Dashboard</p>
          <p className="hero-lead">Personalized insights, proactive care, and holistic wellness tracking — all in one place.</p>

          <div className="hero-cta">
            <a className="btn primary" href="/dashboard">View Dashboard</a>
            <a className="btn outline" href="/login">Get Started</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="card stat">
            <div className="kpi">72%</div>
            <div className="meta">Sleep Quality</div>
          </div>
          <div className="card stat small">
            <div className="kpi">118</div>
            <div className="meta">Avg. Heart Rate</div>
          </div>
          <div className="card stat small">
            <div className="kpi">8/10</div>
            <div className="meta">Mood Score</div>
          </div>
        </div>
  </div>

      <section className="features">
        <div className="feature">
          <h3>Predictive Alerts</h3>
          <p>AI models surface early warnings so you can act before issues escalate.</p>
        </div>
        <div className="feature">
          <h3>Personalized Plans</h3>
          <p>Customized wellness recommendations based on your health signals.</p>
        </div>
        <div className="feature">
          <h3>Secure Data</h3>
          <p>HIPAA-ready controls and end-to-end encryption for your peace of mind.</p>
        </div>
      </section>
    </div>
  )
}

export default Home