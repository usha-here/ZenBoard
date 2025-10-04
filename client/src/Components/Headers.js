import React from 'react'
import './header.css'
import {NavLink} from 'react-router-dom'
const Headers = () => {
  return (
    <>
    <header>
        <nav>
            <div className='left'>
              <h1>ZenBoard</h1>
            </div>
            <div className='right'>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><img src="zen.png" style={{width: '50px', height: '50px', borderRadius: '50%'}} alt=""/></li>
                </ul>
            </div>
        </nav>
    </header>
    
    </>
  )
}

export default Headers