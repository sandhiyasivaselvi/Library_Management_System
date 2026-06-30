import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

const MemberForm = () => {
  const [memberType, setMemberType] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    type: "",
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

  const fetchMember = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/members/${id}`
      );

      const result = await response.json();

      if (result.success) {
        setFormData(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchMember();
}, [id]);

  
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
    console.error(error);
    alert("Something went wrong");
  }
};


  return (
    <div className="flex justify-center w-full mt-10 px-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{id ? "Edit Member" : "Register New Member"}
</h1>
          <Link
            to="/memberlist"
            className="text-blue-500 hover:underline"
          >
            Back to List
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              values={formData.name}
              placeholder="Enter member name"
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                values={formData.email}
                placeholder="Enter email address"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                onChange={handleChange}
                values={formData.phone}
                placeholder="Enter phone number"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-gray-700 font-medium mb-2"
              >
                Department
              </label>
              <input
                type="text"
                name="department"
                onChange={handleChange}
                values={formData.department}
                placeholder="Enter department"
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-medium mb-2"
              >
                Member Type
              </label>

              <select
                value={memberType}
                name="type"
                onChange={handleChange}
                values={formData.type}
                className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Member Type</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="non-teaching">Non-Teaching Staff</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              onChange={handleChange}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {id ? "Update Book" : "Add Book"}

            </button>

            <Link
              to="/memberlist"
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

export default MemberForm;