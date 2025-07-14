import React, { use, useContext, useEffect, useState } from 'react'
import styles from './NewPassword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'


export default function NewPassword() {
    
    const [errorMsg , setErrorMsg]=useState(null)
    const [isLoading  ,setIsLoading] = useState(false)
    let navigate = useNavigate()
    let{setuserLogin}=useContext(userContext) 

    function login(values){
        setIsLoading(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values).then(({data})=>{
            console.log(data);
            if(data.token){
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
            newPassword: yup.string().required('New Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'invalid Password'),
            })
    let formik = useFormik({
        initialValues:{
            email:'', 
            newPassword:'',
        },
        onSubmit: login,
        validationSchema: validate
    })

    return <>
    <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full">
            <form onSubmit={formik.handleSubmit} method="POST" action="#">
                <div className="bg-white px-10 p-5 rounded-xl w-screen shadow-xl max-w-5xl ">
                    <div className="space-y-4">
                    <h1 className="text-center text-2xl font-semibold text-blue-900">Reset Password</h1>
                    <hr />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-black font-semibold text-sm">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email"  value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.email && formik.touched.email?<div className='bg-red-400'>{formik.errors.email} </div>: null}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="newPassword" className="text-black font-semibold text-sm">New Password</label>
                        <input type="Password" id="passwsord" name="newPassword" placeholder="Enter your newPassword" value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange}  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.newPassword && formik.touched.newPassword?<div className='bg-red-400'>{formik.errors.newPassword} </div>: null}
                    </div>
                    </div>
                    
                    
                    <div>
                        {errorMsg? <div className="flex justify-center items-center text-red-500 mt-4">{errorMsg}</div> : null}
                    </div>
                    <button type="submit" value="login" id="login" className="my-6 w-full shadow-xl bg-gradient-to-tr from-blue-950 to-purple-400 hover:to-blue-900 hover:text-white text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Reset Pssword'}
                    </button>
                    
                    
                </div>
                
            </form>
        </div>
    </section>
    </>
    
}
