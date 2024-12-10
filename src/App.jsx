import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes , Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import HomePage from './HomePage';
import Registration from './Registration';
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />

      </Routes>
     </Router>
    </>
  )
}

export default App
