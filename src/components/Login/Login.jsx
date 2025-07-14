import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from '../../Context/UserContext'

export default function Login() {

    const [errorMsg , setErrorMsg]=useState(null)
    const [isLoading  ,setIsLoading] = useState(false)
    let navigate = useNavigate()
    let{setuserLogin}=useContext(userContext)

    function login(values){
        // console.log(values);
        setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values).then(({data})=>{
            console.log(data);
            if(data.message === 'success'){
                localStorage.setItem('userToken' , data?.token)
                navigate('/')
                setIsLoading(false)
                setuserLogin(data?.token)
            }
            }).catch((error)=>{
                setErrorMsg(error.response.data.message);
                setIsLoading(false)
            })
    }
    let validate = yup.object().shape({
            email: yup.string().required('email is required').email('invalid email'),
            password: yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'invalid password'),
            })
    let formik = useFormik({
        initialValues:{
            email:'', 
            password:'',
        },
        onSubmit: login,
        validationSchema: validate
    })

    return <>
    <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full">
            <form onSubmit={formik.handleSubmit} method="POST" action="#">
                <div className="bg-white px-10 py-2 rounded-xl w-screen shadow-xl max-w-sm">
                    <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold text-blue-900">Login</h1>
                    <hr />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-black font-semibold text-sm">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email"  value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.email && formik.touched.email?<div className='bg-red-400'>{formik.errors.email} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-black font-semibold text-sm">Password</label>
                        <input type="password" id="passwsord" name="password" placeholder="Enter your password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.password && formik.touched.password?<div className='bg-red-400'>{formik.errors.password} </div>: null}
                    </div>
                    </div>
                    {/* Remember Me checkbox */}
                    <div className="flex justify-center items-center mt-4">
                    <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <input type="checkbox" id="rememberMeCheckbox" name="rememberMe" className="mr-2" />
                        <span className="text-xs font-semibold">Remember me?</span>
                    </p>
                    <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2 text-gray-400"><Link to='/ForgetPassword' className="text-sm ml-2 text-blue-900 font-semibold">Forget Password ?</Link>
                        </span>
                    </p>
                    </div>
                    
                    <div>
                        {errorMsg? <div className="flex justify-center items-center text-red-500 mt-4">{errorMsg}</div> : null}
                    </div>
                    <button type="submit" value="login" id="login" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-950 to-purple-400 hover:to-blue-900 hover:text-white text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
                    </button>
                    <div className="flex justify-center items-center mt-4">
                    <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2 text-gray-400">You don't have an account?<Link to='/Register' className="text-sm ml-2 text-blue-900 font-semibold">Register now →</Link>
                        </span>
                    </p>
                    </div>
                    
                </div>
                <div className="pt-6 text-base font-semibold leading-7">
                    <p className="font-sans text-purple-500 text-md hover:text-purple-600">
                    <Link to="/" className="absolute">← Home</Link>
                    </p>
                </div>
            </form>
        </div>
    </section>
    </>
}
