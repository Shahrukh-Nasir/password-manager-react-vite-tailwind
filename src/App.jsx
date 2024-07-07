import './App.css'
import React from 'react'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {

  return (
    <>
  
    <Navbar/>

    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

    <Manager/>
    </div>
    </>
  )
}

export default App
