import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Checkout() {
    let{cartId , resetCart}=useContext(cartContext)
    console.log('cartId',cartId);

    function payCash(val){
        console.log(val);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
            shippingAdress: val
        } , {
            headers : {token: localStorage.getItem('userToken')}
        }).then((response)=>{
            console.log(response);
            if(response.data.status === 'success'){
                resetCart()
                toast.success('Payment Done successfully')
            }else{
                toast.error('Something Went Wrong')
            }
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    function payOnline(val){
        console.log(val);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` , {
            shippingAdress: val
        } , {
            headers : {token: localStorage.getItem('myToken')}
        }).then((response)=>{
            console.log(response);
            if(response.data.status === 'success'){
                window.location.href = (response.data.session.url)
            }else{
                toast.error('error')
            }
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    const[onlinePayment,setonlinePayment]=useState(true)

    function detectPayment(val){
        if(onlinePayment){
            payOnline(val)
        }else{
            payCash(val)
        }
    }
    let formik = useFormik({
        initialValues:{
            city:'',
            phone:'',
            detailes:''
        },
        onSubmit:detectPayment
    })
    
    return <>
    <Helmet>
        <title>AllPiq - Checkout</title>
    </Helmet>
        <div className="bg-gray-100 ">
            <div className="w-full max-w-3xl mx-auto p-8">
                <form onSubmit={formik.handleSubmit}>
                    <div className="bg-white mt-25 p-8 rounded-lg shadow-md border border-purple-400">
                        <h1 className="text-2xl font-bold text-gray-800  mb-4">Checkout</h1>
                        {/* Shipping Address */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700  mb-2">Shipping Address</h2>
                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700  mb-1">City</label>
                                <input type="text" value={formik.values.city}  onChange={formik.handleChange} id="city" className="w-full rounded-lg border-blue-900 border py-2 px-3 " />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="phone" className="block text-gray-700  mb-1">Phone</label>
                                <input type="tel" id="phone" value={formik.values.phone}  onChange={formik.handleChange} className="w-full rounded-lg border-blue-900 border py-2 px-3 " />
                            </div>
                            <div>
                                <label htmlFor="detailes" className="block text-gray-700  mb-1">Detailes</label>
                                <input type="text" id="detailes" value={formik.values.detailes}  onChange={formik.handleChange} className="w-full rounded-lg border-blue-900 border py-2 px-3 " />
                            </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={()=>{setonlinePayment(false)}} className="bg-gradient-to-tr from-blue-950 to-purple-400 cursor-pointer text-white px-4 py-2 rounded-lg  w-100 m-auto  dark:hover:bg-teal-900">Pay Cash</button>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={()=>{setonlinePayment(true)}} className="bg-gradient-to-tr from-blue-950 to-purple-400 cursor-pointer text-white px-4 py-2 rounded-lg  w-100 m-auto dark:hover:bg-teal-900">Place Online</button>
                        </div>
                        </div>
                </form>
            </div>
        </div>
    </>
}

{/* Payment Information */}
                        {/* <div>
                            <h2 className="text-xl font-semibold text-gray-700  mb-2">Payment Information</h2>
                            <div className="mt-4">
                            <label htmlFor="card_number" className="block text-gray-700  mb-1">Card Number</label>
                            <input type="text" id="card_number" className="w-full rounded-lg border py-2 px-3 border-green-600" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="exp_date" className="block text-gray-700  mb-1">Expiration Date</label>
                                <input type="text" id="exp_date" className="w-full rounded-lg border py-2 px-3 border-green-600" />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-gray-700  mb-1">CVV</label>
                                <input type="text" id="cvv" className="w-full rounded-lg border py-2 px-3 border-green-600" />
                            </div>
                            </div>
                        </div> */}