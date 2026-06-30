import React from 'react'  
import Navabar from './Navabar.jsx' 
import { Outlet } from 'react-router-dom'   

const Layout = () => {
    return (
        <div>
            <Navabar/>
            <main className='flex-grow max-w-6xl w-full mx-auto px-4 py-8'>
                <Outlet/>
            </main>
            
        </div>
    )
}
export default Layout    