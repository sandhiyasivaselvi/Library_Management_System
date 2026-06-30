import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const baseUrl = import.meta.env.VITE_API_URL;

  
  const fetchBooks = () => {
    setLoading(true);
    fetch(`${baseUrl}/api/books`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setBooks(result.data);
        } else {
          setBooks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  
  useEffect(() => {
    fetchBooks();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      
      const response = await fetch(`${baseUrl}/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete response:", result);

      
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = id
      ? `${import.meta.env.VITE_API_URL}/api/books/${id}`
      : `${import.meta.env.VITE_API_URL}/api/books`;

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

    alert(id ? "Book Updated Successfully" : "Book Added Successfully");

    navigate("/booklist");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  return (
    <div className='bg-gray-300 p-10 rounded-lg shadow-md mt-16 mr-10 ml-10 '> 
        <div className='flex items-center justify-between mb-4 px-8 '>
          <h1 className='text-3xl text-gray-700 font-bold' >Manage Books</h1>
          <Link to="/bookform" className='text-white bg-blue-500 p-2 rounded'>
            + Add New Books
          </Link>
        </div>
      

    <div className='bg-white p-4 rounded-lg w-full h-full'>
      <table className='w-full border-collapse border border-gray-200 rounded-lg shadow-md '>
        <thead className='text-left text-gray-700 border-2 border-gray-200 bg-gray-200 mx-full mb-4 center w-full p-4 rounded-lg shadow-md '>
          <tr>
            <th className='p-4'>Book Details</th>
            <th className='p-4'>ISBN & Category</th>
            <th className='p-4'>Stock Status</th>
            <th className='p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id || book.isbn || book._id} className='bg-white mb-4 center w-full p-4 rounded-lg h-full border-b border-gray-100'>
                  
                  <td className='p-4'>
                    <div className="font-bold text-gray-800">{book.title}</div>
                    <div className="text-sm text-gray-500">by {book.author} ({book.year})</div>
                  </td>   
                  
                  
                  <td className='p-4'>
                    <div className="text-gray-700 font-mono text-sm">{book.isbn}</div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">{book.category}</span>
                  </td>
                  
                 
                  <td className='p-4'>
                    <div className="text-gray-700 font-medium">{book.noc} Copies</div>
                  </td>
                  
                  
                  <td className='p-4'>
                    <button 
                    onClick={() => navigate(`/editbook/${book._id}`)}
                    className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-2 hover:bg-blue-600'>Edit</button>
                    <button 
                    onClick={()=>{
                      handleDelete(book._id)
                    }}
                     className='bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600'>Delete</button>
                  </td>
                </tr>
              ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-10 text-gray-500 font-medium">
              No Books Registered in the Category yet.
            </td>
          </tr>
        )}
        </tbody>    
      </table>
    </div>
    </div>
  )
}

export default BookList;
