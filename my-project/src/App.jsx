import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import BookForm from "./pages/BookForm.jsx"
import MemberForm from "./pages/MemberForm.jsx"
import Layout from "./component/Layout.jsx"
import BookList from "./pages/BookList.jsx"
import MemberList from "./pages/MemberList.jsx"

const App = () => {
  return (
    
      <Routes>

        <Route path="/Login" element={<Login/>} />
        <Route path="/" element={<Layout/>} >
            <Route index element={<Navigate to="/" replace />}
/>
            <Route path="booklist" element={<BookList/>} />
            <Route path="memberlist" element={<MemberList/>}/>
            <Route path="bookform" element={<BookForm/>}/>
            <Route path="memberform" element={<MemberForm/>}/>
            <Route path="/editbook/:id" element={<BookForm />} />
            <Route path="/editmember/:id" element={<MemberForm />} />
        </Route>

      </Routes>  
   
  
  )
}
export default App;  
