import React from 'react'
import './login.css'

const Login = () => {
  return (
    <>
    <div className='login-page'>
      <h1 style={{textAlign: 'center', marginTop: '20px'}}>Login</h1>
      <div className="form">
                <form className='login-form'>
                    <input type="text" name="" id="" placeholder='username' />
                    <input type="password" name="" id="" placeholder='password'  />
                    <button>Login</button>
                    <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
                </form>
                <button className='login-with-google-btn'>
                    Sign In With Google
                </button>
            </div>
    </div>
    </>
  )
}

export default Login