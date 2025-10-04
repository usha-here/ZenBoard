import React,{useEffect,useState} from 'react'
import './header.css'
import {NavLink, useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'



const Headers = () => {
  const [userdata, setUserdata] = useState({});
  console.log("response",userdata)
  const navigate = useNavigate()
  const location = useLocation()

  const getUser = async () => {
      try {
          const response = await axios.get("http://localhost:3001/login/success", { withCredentials: true });
          setUserdata(response.data.user)
      } catch (error) {
          console.log("error", error)
      }
  }
  //logout
   const logout = ()=>{
        window.open("http://localhost:3001/logout","_self")
    }
  useEffect(()=>{
    getUser()
  },[])
  // redirect logged-in users who land on /login to the need input page
  useEffect(()=>{
    if (Object.keys(userdata).length > 0 && location.pathname === '/login'){
      navigate('/need')
    }
  },[userdata, location, navigate])
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
                    {
                      Object?.keys(userdata).length > 0 ?(
                      <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                        <li onClick={logout}>Logout</li>
                       <li style={{color: 'white', fontWeight: 'bold', marginLeft: '10px'}}>
  {userdata.displayName ? `${userdata.displayName}!` : userdata.email}
</li></>):
                        <li><NavLink to="/login">Login</NavLink></li>
                    }
                </ul>
            </div>
        </nav>
    </header>
    
    </>
  )
}

export default Headers