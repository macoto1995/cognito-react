import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'
import './amplify'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './pages/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>,
)
