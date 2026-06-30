import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useEffect } from 'react';

const MemberList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const baseUrl = import.meta.env.VITE_API_URL
  
    const fetchMembers = () => {
        setLoading(true);
        fetch(`${baseUrl}/api/members`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.success) {
              setMembers(result.data);
            } else {
              setMembers([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching members:", error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      };
    
      
      useEffect(() => {
        fetchMembers();
      }, []);
    
      
      const handleDelete = async (id) => {
        try {
          
          const response = await fetch(`${baseUrl}/api/members/${id}`, {
            method: "DELETE",
          });
    
          if (!response.ok) {
            throw new Error(`Failed to delete member. Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log("Delete response:", result);
    
          
          fetchMembers();
        } catch (error) {
          console.error("Error deleting member:", error.message);
        }
      };   
      
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = id
      ? `${import.meta.env.VITE_API_URL}/api/members/${id}`
      : `${import.meta.env.VITE_API_URL}/api/members`;

    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert(id ? "Member Updated Successfully" : "Member Added Successfully");

    navigate("/memberlist");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};


  return (
  <div className='bg-gray-300 p-4 rounded-lg shadow-md mt-16 mr-10 ml-10 '> 
        <div className='flex items-center justify-between mb-4 px-4 w-full border-collapse'>
      <h1 className='text-3xl text-gray-700 font-bold'>Manage Members</h1>
      <Link to='/memberform' className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded transition-colors'>
        + Add New Member
      </Link>
    </div>

    <div className='bg-white p-4 rounded-lg w-full h-full'>
      <table className='w-full border-collapse border border-gray-200 rounded-lg shadow-md '>
        <thead className='text-left text-gray-700 border-2 border-gray-200 bg-gray-200 w-full p-4 rounded-lg shadow-md'>
          <tr>
            <th className='p-4'>Full Name</th>
            <th className='p-4'>Contact Info</th>
            <th className='p-4'>Department</th>
            <th className='p-4'>Member Type</th>
            <th className='p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((item) => (
              <tr key={item._id || item.email} className='bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors w-full p-4 h-full'>
                <td className='p-4 font-medium text-gray-900'>
                  {item.name}
                </td>   
                <td className='p-4 text-gray-600'>
                  <span className="block text-sm">{item.email}</span>
                  <span className="block text-xs text-gray-400">Ph: {item.phone}</span>
                </td>
                <td className='p-4 text-gray-600 capitalize'>
                  {item.department}
                </td>
                <td className='p-4 text-gray-600 capitalize'>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                    {item.type}
                  </span>
                </td>
                <td className='p-4'>
                  <button className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-2 hover:bg-blue-600 transition-colors'
                  onClick={() => navigate(`/editmember/${item._id}`)}>

                    Edit
                  </button>
                  <button 
                  onClick={()=>{
                      handleDelete(item._id)
                    }}
                  className='bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-10 text-gray-500 font-medium">
                No Members Registered in the Category yet.
              </td>
            </tr>
          )}
        </tbody> 
      </table>
    </div>
  </div>
);
}

export default MemberList

