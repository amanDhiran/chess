import { useState } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Game from './pages/Game'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
const location = useLocation()
  return (
    <div>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/game' element = {<Game />} />
          <Route path='/login' element = {<Login />} />
        </Routes>
    </div>
  )
}
 
export default App
