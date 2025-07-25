import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Customers from './components/Customers.jsx'
import AddCustomer from './components/AddCustomer.tsx'
import EditCustomer from './components/EditCustomer.tsx'
import AdminRegister from './components/adminComponets/AdminRegister.tsx'
import AdminLogin from './components/adminComponets/AdminLogin.tsx'
import Products from './components/productsComponent/Products.tsx'
import AddProduct from './components/productsComponent/AddProduct.tsx'
import EditProduct from './components/productsComponent/EditProducts.tsx'
import AddOrder from './components/ordersComponents/AddOrder.tsx'
import OrderDetails from './components/ordersComponents/OrderDetails.tsx'
import Dashboard from './components/Dashboard.tsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path='customer/' element={<Customers />} />
      <Route path='customer/add' element={<AddCustomer />} />
      <Route path="/customer/edit/:id" element={<EditCustomer />} />

      <Route path="admin/register" element={<AdminRegister />} />
      <Route path="admin/login" element={<AdminLogin />} />

      <Route path='product/' element={<Products />} />
      <Route path='product/add' element={<AddProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />

      <Route path='orders/' element={<OrderDetails />} />
      <Route path='orders/add' element={<AddOrder />} />
      



    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)







