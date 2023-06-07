import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound'
import AllProducts from './pages/AllProducts'
import NewProduct from './pages/NewProduct'
import ProductDetail from './pages/ProductDetail'
import MyCarts from './pages/MyCarts'
import Home from './pages/Home'
import ProtectedRoute from './pages/ProtectedRoute'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCarts />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
root.render(
  <React.Fragment>
    <RouterProvider router={router} />
  </React.Fragment>
)
