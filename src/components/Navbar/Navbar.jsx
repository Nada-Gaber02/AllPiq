import React, { use, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import cartImg from '../../assets/Images/cart.png'
import { Link,  NavLink,  useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../../Context/UserContext'
import { cartContext } from '../../Context/CartContext'
NavLink

export default function Navbar() {
    let {userLogin , setuserLogin} = useContext(userContext)
    let navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let{numOfCartItems}=useContext(cartContext)

    function logout(){
        localStorage.removeItem('userToken')
        setuserLogin(null)
        navigate('/Login')
    }
    
    return <>
<nav className="bg-purple-400 border-gray-200 py-2.5 fixed w-full z-10">
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center ">
        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white italic">AllPiq</span>
        </div>
        <div className="flex items-center lg:order-2">
        <div className="hidden mt-2 mr-4 sm:inline-block">
            <span />
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="true">
            <span className="sr-only">Open main menu</span>
            <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`}  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
        </div>
        <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:p-4">
            {userLogin !== null ? <>
            <li>
                <NavLink to='/'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">Home</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='Products'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">Products</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='WishList'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">WhishList</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='Categories'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">Categories</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='Brands'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">Brands</p>
                </NavLink>
            </li>
            <li>
                <NavLink to='Contact'>
                    <p className="block py-2 pl-3 pr-4 text-white rounded lg:bg-transparent  lg:p-0 ">Contact</p>
                </NavLink>
            </li>
            </> : null}
            <div className="flex gap-5 mt-2 lg:mt-0 lg:ml-40">
                {userLogin === null ? <>
                <Link to='Login' className="block py-2 px-4 text-white rounded lg:bg-transparent lg:p-0">
                <p>Login</p>
                </Link>
                <Link to='Register' className="block py-2 px-4 text-white rounded lg:bg-transparent lg:p-0">
                <p>Register</p>
                </Link>
                </> :
                <>
                <li className='relative'>
                <Link to='Cart'>
                    <img src={cartImg} className='w-8' alt="" /> <span className="bg-indigo-100 absolute -top-3 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-indigo-900 dark:text-indigo-300">{numOfCartItems}</span>
                    
                </Link>
            </li>
                <li onClick={logout} className='cursor-pointer'><p className="block py-2 px-4 text-white rounded lg:bg-transparent lg:p-0">Logout</p></li>
                </>
                }
            </div>
        </ul>
        </div>
    </div>
</nav>

<script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
    </>
}
