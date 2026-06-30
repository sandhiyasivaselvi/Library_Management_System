import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [noc, setNoc] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [formData, setFormData] = useState({
  title: "",
  author: "",
  isbn: "",
  noc: "",
  category: "",
  year: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
  if (!id) return;

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/books/${id}`
      );

      const result = await response.json();

      if (result.success) {
        setFormData(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchBook();
}, [id]);

  
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
    console.error(error);
    alert("Something went wrong");
  }
};
  return (
    <div className="flex justify-center w-full mt-10 px-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {id ? "Edit Book" : "Add New Book"}
          </h1>
          <Link to="/booklist" className="text-blue-500 hover:underline">
            Back to List
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Book Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter book title"
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-medium mb-2"
              >
                Author
              </label>
              <input
                type="text"
                name="author"
                onChange={handleChange}
                value={formData.author}
                placeholder="Enter author name"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="isbn"
                className="block text-gray-700 font-medium mb-2"
              >
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                onChange={handleChange}
                value={formData.isbn}
                placeholder="Enter ISBN number"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="copies"
                className="block text-gray-700 font-medium mb-2"
              >
                Number of Copies
              </label>
              <input
                type="number"
                name="noc"
                onChange={handleChange}
                value={formData.noc}
                placeholder="Enter number of copies"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm"
              >
              <option value="">Select a Category</option>
              <option value="Fantasy & fairy Tales">
                Fantasy & Fairy Tales
              </option>
              <option value="Comics">
                Comics
              </option>
              <option value="Science">
                Science
              </option>
              </select>
            </div>
          </div>

          
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-gray-700 font-medium mb-2"
            >
              Published Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter published year"
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              onChange={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
>
              {id ? "Update Book" : "Add Book"}
            </button>

            <Link
              to="/booklist"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;