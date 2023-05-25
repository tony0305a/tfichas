import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {App} from './App'
import { Login } from './pages/login'
import { Home } from './pages/home'

const router = createBrowserRouter([
{
  path:"/",
  element:<Login/>
},
{
  path:"/home",
  element:<Home/>
}

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
