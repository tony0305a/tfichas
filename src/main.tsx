import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import {App} from './App'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { Create } from './pages/create'

const router = createBrowserRouter([
{
  path:"/",
  element:<Login/>
},
{
  path:"/home",
  element:<Home/>,
  errorElement:<Login/>
},
{
  path:"/create",
  element:<Create/>
}

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
