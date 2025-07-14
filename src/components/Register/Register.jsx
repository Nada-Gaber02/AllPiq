import React, { useContext, useState } from 'react'
import styles from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { userContext } from '../../Context/UserContext'

export default function Register() {

    const [errorMsg , setErrorMsg]=useState(null)
    const [isLoading  ,setIsLoading] = useState(false)
    let navigate = useNavigate()
    let {setuserLogin}= useContext(userContext)

    function signUp(values){
        // console.log(values);
        setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values).then(({data})=>{
            console.log(data);
            if(data.message === 'success'){
                localStorage.setItem('userToken' , data?.token)
                navigate('/')
                setIsLoading(false)
                setuserLogin(data?.tokenn)
            }
            }).catch((error)=>{
                setErrorMsg(error?.response?.data?.message)
                setIsLoading(false)
            })
    }
    let validate = yup.object().shape({
                name: yup.string().required('name is required').min(3,'minimun 3 letters').max(10,'maximum 10 letters'),
                email: yup.string().required('email is required').email('invalid email'),
                phone: yup.string().required('number is required').matches(/^01[0125][0-9]{8}$/ , 'invalid phone'),
                password: yup.string().required('pass is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'invalid pass'),
                rePassword: yup.string().required('rePass is required').oneOf([yup.ref('password')] , 'invalid rePass')
            })
    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'', 
            password:'',
            rePassword:''
        },
        onSubmit: signUp,
        validationSchema: validate
    })
    
    return <>
    <section className="h-auto p-20 bg-gray-100 flex items-center justify-center">
        <div className=" bg-gradient-to-br  flex justify-center items-center w-full">
            <form method="POST" onSubmit={formik.handleSubmit} action="#">
                <div className="bg-white  px-10 py-8 rounded-xl w-screen shadow-2xl max-w-sm">
                    <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold  text-blue-900">Register</h1>
                    <hr />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-black font-semibold text-sm">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your Name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-950" required />
                        {formik.errors.name && formik.touched.name?<div className='bg-red-400'>{formik.errors.name} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-black font-semibold text-sm">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-950" required />
                        {formik.errors.email && formik.touched.email?<div className='bg-red-400'>{formik.errors.email} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="phone" className="text-black font-semibold text-sm">Phone</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter your phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-950" required />
                        {formik.errors.phone && formik.touched.phone?<div className='bg-red-400'>{formik.errors.phone} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-black font-semibold text-sm">Password</label>
                        <input type="password" id="passwsord" name="password" placeholder="Enter your password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-950" required />
                        {formik.errors.password && formik.touched.password?<div className='bg-red-400'>{formik.errors.password} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="rePassword" className="text-black font-semibold text-sm">Confirm Password</label>
                        <input type="password" id="rePasswsord" name="rePassword" placeholder="Enter your rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-950" required />
                        {formik.errors.rePassword && formik.touched.rePassword?<div className='bg-red-400'>{formik.errors.rePassword} </div>: null}
                    </div>
                    </div>
                    {errorMsg? <div className="flex justify-center items-center text-red-500 mt-4">
                        {errorMsg} </div> : null}
                    <button type="submit" value="login" id="register" className="mt-6 cursor-pointer w-full shadow-xl bg-gradient-to-tr from-blue-900 to-purple-400 hover:to-blue-900 hover:text-white text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Register'}    
                    </button>
                </div>
                <div className="p-5 text-base font-semibold leading-7">
                    <p className="font-sans text-purple-500 text-md hover:text-purple-600">
                    <Link to="/Login" className="absolute">← Login</Link>
                    </p>
                </div>
            </form>
        </div>
    </section>
    </>
}
