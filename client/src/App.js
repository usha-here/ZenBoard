import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import NeedInput from './Components/NeedInput';
import Analyzing from './Components/Analyzing';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/need' element={<NeedInput />} />
  <Route path='/analyzing' element={<Analyzing />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;