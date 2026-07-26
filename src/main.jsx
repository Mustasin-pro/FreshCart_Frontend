import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router' 
import { RouterProvider } from 'react-router'
import { CartProvider } from "./provider/CartProvider";
import AuthProvider from "./provider/AuthProvider";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)