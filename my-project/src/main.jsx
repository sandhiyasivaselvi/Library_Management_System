import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import BookForm from "./pages/BookForm.jsx"
import Layout from "./component/Layout.jsx"
import { Navigate } from 'react-router-dom'
import BookList from "./pages/BookList.jsx"
import MemberList from "./pages/MemberList.jsx"
import App from "./App.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      <App/>  
      <ToastContainer/>
  </BrowserRouter>
  
);


