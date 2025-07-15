import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import ErrorPage from './components/ErrorPage/ErrorPage.jsx'
import Home from './components/Home/Home.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import ProtectRoute from './components/ProtectRoute/ProtectRoute.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Cart from './components/Cart/Cart.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './Context/WishListContext.jsx';
import WishList from './components/WishList/WishList.jsx';
import Products from './components/Products/Products.jsx';
import Categories from './components/Categories/Categories.jsx';
import Brands from './components/Brands/Brands.jsx';
import Checkout from './components/Checkout/Checkout.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import VerificationCode from './components/VerificationCode/VerificationCode.jsx'
import NewPassword from './components/NewPassword/NewPassword.jsx'
import Contact from './components/Contact/Contact.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let queryClient = new QueryClient()

function App() {
  let route = createBrowserRouter([
        {path:'' , element:<Layout/> , children:[
          {pindex : true , element:<ProtectRoute><Home/></ProtectRoute>},
          {path:'ProductDetails/:id/:category' , element:<ProtectRoute><ProductDetails/></ProtectRoute>},
          {path:'Cart' , element:<ProtectRoute><Cart/></ProtectRoute>},
          {path:'Checkout' , element:<ProtectRoute><Checkout/></ProtectRoute>},
          {path:'WishList' , element:<ProtectRoute><WishList/></ProtectRoute>},
          {path:'Products' , element:<ProtectRoute><Products/></ProtectRoute>},
          {path:'Categories' , element:<ProtectRoute><Categories/></ProtectRoute>},
          {path:'Brands' , element:<ProtectRoute><Brands/></ProtectRoute>},
          {path:'Contact' , element:<ProtectRoute><Contact/></ProtectRoute>},
          {path:'Login' , element:<Login/>},
          {path:'ForgetPassword' , element:<ForgetPassword/>},
          {path:'VerificationCode' , element:<VerificationCode/>},
          {path:'NewPassword' , element:<NewPassword/>},
          {path:'Register' , element:<Register/>},
          {path:'*' , element:<ProtectRoute>:<ErrorPage/></ProtectRoute>}
        ]}
    ])

  return <>
  
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={route}></RouterProvider>
          <Toaster/>
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
  
  </>
}

export default App
