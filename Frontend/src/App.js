import './App.css'
import React, { useContext, useState } from 'react'
import Topbar from './componants/topbar/Topbar'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Single from './pages/single/Single'
import Home from './pages/home/Home'
import { toast, ToastContainer, Slide, Bounce, Flip, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Context } from './context/Context'
import Categories from './pages/Categories/Categories'
import Footer from './componants/footer/Footer'
import Contact from './componants/contact/Contact'

export default function App() {

  const { user } = useContext(Context);
  return (
    <>

      <div className='app'>
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/register' element={user ? <Home /> : <Register />} />
            <Route path='/login' element={user ? <Home /> : <Login />} />
            <Route path='/write' element={user ? <Write /> : <Register />} />
            <Route path='/post/:postId' element={<Single />} />
            <Route path='/category/:cat' element={<Categories />} />
            <Route path='/settings' element={user ? <Settings /> : <Register />} />
            <Route path='/contact' element={<Contact/>} />
          </Routes>
        
        </BrowserRouter>
        <ToastContainer theme='colored' transition={Slide} autoClose={3000} hideProgressBar={true}></ToastContainer>
      </div>
    </>
  )
}
