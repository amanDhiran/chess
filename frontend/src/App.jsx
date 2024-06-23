import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Game from './pages/Game'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/game' element = {<Game />} />
          <Route path='/login' element = {<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
 
export default App
