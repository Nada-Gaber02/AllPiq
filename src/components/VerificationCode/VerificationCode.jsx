import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet'

export default function VerifyResetCode() {

    const [errorCodeMsg , setErrorCodeMsg]=useState(null)
    const [isLoading  ,setIsLoading] = useState(false)
    let navigate = useNavigate()
    // let{setuserLogin}=useContext(userContext)

    function verifyResetCode(value){
        console.log('reset' , value);
        setIsLoading(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , value).then(({data})=>{
            console.log('Response Data:', data);
            if(data.status === 'Success'){
                navigate('/NewPassword')
                localStorage.setItem('userToken' , data?.token)
                toast.success('Success')
                setIsLoading(false)
                
            }
            }).catch((error)=>{
                toast.error('Verification failed');
                setErrorCodeMsg(error.response.data.message);
                setIsLoading(false)
            })
    }
    let validate = yup.object().shape({
            resetCode: yup.number().required('Reset code is required'),
            })
    let formik = useFormik({
        initialValues:{
            resetCode:'', 
        },
        onSubmit: verifyResetCode,
        validationSchema: validate
    })

    return <>
    <Helmet>
        <title>AllPiq - Verify</title>
    </Helmet>
    <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="h-screen bg-gradient-to-br flex justify-center items-center w-full">
            <form onSubmit={formik.handleSubmit} method="POST" action="#">
                <div className="bg-white px-10 py-2  rounded-xl w-screen shadow-xl max-w-5xl">
                    <div className="space-y-4 p-5">
                    <h1 className="text-center text-2xl font-semibold text-blue-900"> Verification Code </h1>
                    <hr />
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="resetCode" className="text-black font-semibold text-lg">ResetCode</label>
                        <input type="text" id="resetCode" name="resetCode" placeholder="Enter your reset Code"  value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-900" required />
                        {formik.errors.resetCode && formik.touched.resetCode?<div className='bg-red-400'>{formik.errors.resetCode} </div>: null}
                    </div>
                    </div>
                    
                    <div>
                        {errorCodeMsg? <div className="flex justify-center items-center text-red-500 mt-4">{errorCodeMsg}</div> : null}
                    </div>
                    <button type="submit" value="resetPassword" id="resetPassword" className="my-6 w-full  shadow-xl bg-gradient-to-tr from-blue-950 to-purple-400 hover:to-blue-900  hover:text-white text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000 cursor-pointer">
                        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Reset Password '}
                    </button>
                    
                </div>
            </form>
        </div>
    </section>
    </>
}
