import React, { use, useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
    
    let{cartId , numOfCartItems , cartProducts , totalPrice , update , deleteProd}=useContext(cartContext)

    async function handleUpdate(prodId , count){
        let response = await update(prodId , count)
        console.log(response);
        if(response.data.status === 'success'){
            toast.success('Product Updated')
        }else{
            toast.error('Something went wrong')
        }
    }

    async function handleDelete(prodId ){
        let response = await deleteProd(prodId )
        console.log(response);
        if(response.data.status === 'success'){
            toast.success('Product deleted')
        }else{
            toast.error('Something went wrong')
        }
    }


    return <>
    {cartProducts? <>
    <section className="w-full container max-w-8xl mx-auto bg-white dark:bg-[#0A2025] py-9 px-8">
        <h1 className="text-center  text-[#191919] dark:text-white text-[32px] font-semibold mt-25">
            My Shopping Cart
        </h1>
        <div className="flex flex-col md:flex-row  justify-center items-start mt-8 gap-6">
            <div className="bg-white p-4  md:w-1/2  rounded-xl">
            <table className="w-full bg-white rounded-xl">
                <thead>
                <tr className="text-center border-b border-gray-400 w-full text-purple-400 font-bold text-md uppercase leading-[14px] tracking-wide">
                    <th className="text-left px-2 py-2">Product</th>
                    <th className="px-2 py-2">Quantity</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="w-7 px-2 py-2" />
                </tr>
                </thead>
                <tbody>
                {cartProducts?.map((prod)=>{
                    return <>
                    <tr key={prod?.product._id} className="text-center">
                    <td className="px-2 py-2 text-left align-top">
                    <img src={prod?.product?.imageCover} alt="test" className="w-[100px] mr-2 inline-block h-[100px]" /><span className='text-blue-900'>{prod?.product?.title}</span>
                    </td>
                    <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
                <svg onClick={()=>{handleUpdate(prod?.product?._id , prod?.count-1)}} width={14} height={15} className="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    <span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">{prod.count}</span>
                <svg onClick={()=>{handleUpdate(prod?.product?._id , prod?.count+1)}} className="cursor-pointer relative" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </td>
                    <td className="px-2 py-2">{prod.price}</td>
                    <td className="px-2 py-2">
                    <svg onClick={()=>{handleDelete(prod?.product?._id)}} width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CB2F37" strokeMiterlimit={10} />
                        <path d="M16 8.5L8 16.5" stroke="#CB2F37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 16.5L8 8.5" stroke="#CB2F37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </td>
                </tr>
                    </>
                })}
                
                </tbody>
                <tfoot>
                <tr className="border-t border-gray-400">
                    <td className="px-2 py-2" colSpan={3}>
                    <Link to='/'>
                        <button className="px-8 cursor-pointer py-3.5 rounded-[43px] text-blue-900 underline  text-sm font-semibold className leading-[16px]">
                            ← Return to shop
                        </button>
                    </Link>
                    </td>
                </tr>
                </tfoot>
            </table>
            </div>
            <div className="w-full container   md:w-1/2 bg-white rounded-lg sm:p-0 lg:p-5">
                <div className="w-[376px]   py-3 justify-between items-center flex">
                <span className="text-[#4c4c4c] text-base font-normal leading-normal">Number of Cart Items : </span><span className="text-[#191919] text-base font-semibold leading-tight">{numOfCartItems}</span>
            </div>
            <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
                Cart Total
            </h2>
            <div className="w-[376px]   py-3 justify-between items-center flex">
                <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">{totalPrice} EGP</span>
            </div>
            <div className="w-[376px]  py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
                <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
            </div>
            <div className="w-[376px]   py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
                <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Subtotal:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">{totalPrice} EGP</span>
            </div>
            <Link to='/Checkout'>
                <button className="w-[376px]   text-white mt-5 px-10 py-4 bg-gradient-to-tr from-blue-950 to-purple-400 rounded-[44px] gap-4 text-base font-semibold leading-tight cursor-pointer">
                    Proceed to checkout
                </button>
            </Link>
            </div>
        </div>
        
    </section>
    </>
    : `No Cart Items Available`}

    </>
}
