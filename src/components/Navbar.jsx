import React, { useState } from 'react'

const Navbar = () => {
    
        const github = ()=>{
            return <a href="https://github.com/Shahrukh-Nasir"></a>
        }
  return (
    
    <nav className='bg-black text-white'>
        <div className='mycontainer flex justify-between px-4 items-center py-5 h-14'>

        <div className="logo font-bold text-white text-2xl">
        <span className='text-purple-800'>&lt;</span>
        Pass  
        <span className='text-purple-800'>OP/&gt;</span>  
        </div>
        <ul>
            {/* <li className='flex gap-4'>
                <a className=' hover:font-bold' href="/">Home</a>
                <a className=' hover:font-bold' href="#">About Us</a>
                <a  className=' hover:font-bold' href="#">Contact Us</a>

            </li> */}
        </ul>
            <button>
                 <img src="/Icons/githublogo.png" className='w-7' alt=""/>
            </button>
        </div>
    </nav>
  )
}

export default Navbar
