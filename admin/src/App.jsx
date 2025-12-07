import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const currency = '$'


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])




  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />

      {token === "" ? <Login setToken={setToken} /> :

        <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add setToken={setToken} />} />
                <Route path='/list' element={<List setToken={setToken} />} />
                <Route path='/orders' element={<Order token={token} setToken={setToken} />} />
              </Routes>
            </div>
          </div>
        </>
      }


    </div>
  )
}

export default App