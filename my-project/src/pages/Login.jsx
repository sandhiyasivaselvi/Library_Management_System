import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login = () => {
    const [formData, setFormData] = useState({username:"", password:""})
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name] : e.target.value});
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        if(
            formData.username === "admin" &&
            formData.password === "Admin@2026"
        ){
            localStorage.setItem("admin",JSON.stringify({
                username : formData.username,
                password : formData.password
            }))
            //console.log("Login successfull")
            toast.success("Login successfully")
            navigate("/booklist")
        }
        else{
            console.log("Invalid username or password")
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <div className='text-center mb-6'> 
                    <h1 className='text-3xl font-bold padding-y-10 margin-y-10 '>Library Management System</h1>
                    <p className='text-2xl text-gray-600 padding-y-4'>Welcome to the admin panel!</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4 margin-y-6 margin-x-6'>
                        <label htmlFor="user name" className='block text-2xl font-medium text-gray-700'>User Name</label>
                        <input type="text" 
                               id='user name' 
                               name="username"
                               value={formData.username}
                               onChange={handleChange}

                               placeholder='Eg admin' 
                               className='w-full p-2.5 border rounded border-gray-300 rounded-md shadow-sm focus:ring-blue-500 ' />
                    </div>
                    <div className='mb-4 margin-y-6 margin-x-6'>
                        <label htmlFor="password" className='block text-2xl font-medium text-gray-700'>Password</label>
                        <input type="password" 
                               id='password' 
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               placeholder='Eg Admin@2026' 
                               className='w-full p-2.5 border rounded border-gray-300 rounded-md shadow-sm focus:ring-blue-500' 
                        />
                    </div>
                    <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>Sign In</button>    
                </form>
            </div>
        </div>
    )
}
export default Login
