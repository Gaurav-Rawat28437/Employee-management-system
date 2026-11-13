
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateEmployee from './pages/CreateEmployee'

function App() {
  return (
    <div>

      <Toaster/>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/addEmployee' element={<CreateEmployee />}></Route>

      </Routes>
      
    </div>
  )
}

export default App
