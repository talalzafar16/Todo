import React from 'react'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Todo from '../Components/Todo'
import Signup from '../Components/Signup'
export default function router() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="Home" element={<Home/>}/>
            <Route path="Signup" element={<Signup/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="Todo/:id" element={<Todo/>}/>
        </Routes>
      </Router>
    </div>
  )
}
