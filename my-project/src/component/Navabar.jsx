import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navabar = () => {
  return (
        <nav className="bg-gray-100 fixed top-0 left-0 w-full bg-white shadow z-50">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
                <div className="flex items-center justify-between h-16">
                    <Link className="text-2xl font-bold text-gray-600 text-semibold">Libris<span className="text-2xl text-blue-600">Admin</span></Link>
                   
                    <div className="flex items-center">
                        <Link to="/BookList" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Book</Link>
                        <Link to="/MemberList" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Member</Link>
                   
                        <Link to="/Login" className="bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
                    </div>
                </div>     
            </div>
        </nav>
  )
}

export default Navabar
