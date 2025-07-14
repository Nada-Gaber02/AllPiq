import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from '../../Context/UserContext'
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPasswords() {

    const [errorEmailMsg , setErrorEmailMsg]=useState(null)
    const [isLoading  ,setIsLoading] = useState(false)
    let navigate = useNavigate()
    let{setuserLogin}=useContext(userContext)

    function forgotPasswords(values){
        // console.log(values);
        setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values).then(({data})=>{
            console.log(data);
            if(data.statusMsg=== 'success'){
                localStorage.setItem('userToken' , data?.token)
                toast.success('Reset code sent to your email')
                setIsLoading(false)
                navigate('/VerificationCode')
            }
            }).catch((error)=>{
                setErrorEmailMsg(error.response.data.message);
                setIsLoading(false)
            })
    }
    let validate = yup.object().shape({
            email: yup.string().required('email is required').email('invalid email'),
            })
    let formik = useFormik({
        initialValues:{
            email:'', 
        },
        onSubmit: forgotPasswords,
        validationSchema: validate
    })

    return <>
    <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full">
            <form onSubmit={formik.handleSubmit} method="POST" action="#">
                <div className="bg-white px-10 py-2  rounded-xl w-screen shadow-xl max-w-5xl">
                    <div className="space-y-4 p-5">
                    <h1 className="text-center text-2xl font-semibold text-blue-900"> Verify your Email</h1>
                    <hr />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-black font-semibold text-sm">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email"  value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.email && formik.touched.email?<div className='bg-red-400'>{formik.errors.email} </div>: null}
                    </div>
                    </div>
                    
                    <div>
                        {errorEmailMsg? <div className="flex justify-center items-center text-red-500 mt-4">{errorEmailMsg}</div> : null}
                    </div>
                    <button type="submit" value="login" id="login" className="my-6 w-full  shadow-xl bg-gradient-to-tr from-blue-950 to-purple-400 hover:to-blue-900 hover:text-white text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Verify    '}
                    </button>
                    
                </div>
                
            </form>
        </div>
    </section>
    </>
}
