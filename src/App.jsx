import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import Login from './components/Login'
import Signup from './components/Signup'

const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <div>
          <Navbar></Navbar>
          <Home></Home>
        </div>
    },
    {
      path: "/pastes",
      element: 
        <div>
          <Navbar></Navbar>
          <Paste></Paste>
        </div>
    },
    {
      path: "/pastes/:id",
      element: 
        <div>
          <Navbar></Navbar>
          <ViewPaste></ViewPaste>
        </div>
    },
    {
      path: "/login",
      element: 
        <div>
          <Navbar></Navbar>
          <Login></Login>
        </div>
    },
    {
      path: "/signup",
      element: 
        <div>
          <Navbar></Navbar>
          <Signup></Signup>
        </div>
    },
  ]  
)

function App() {
  

  return (
    <>
      <div>
        <RouterProvider router={router}>

        </RouterProvider>
      </div>
    </>
  )
}

export default App
