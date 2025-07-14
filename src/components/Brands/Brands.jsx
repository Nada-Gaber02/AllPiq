import React, { useEffect } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { Helmet } from 'react-helmet'
// import { useQuery } from '@tanstack/react-query'

export default function Brands() {
    const [brandProd , setBrandProd] = useState(null)
    function getBrandsProd(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then(({data})=>{
            console.log('brands' ,data.data);
            setBrandProd(data?.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    // let {isError , data , isLoading , isFetched , isFetsching} = useQuery({
    //     queryKey:['brands'],
    //     queryFn: getBrandsProd,
    //     select:(data)=>{
    //         return data?.data?.data
    //     }
    // })
    useEffect(()=>{
        getBrandsProd()
    } , [])
    return <>
    <Helmet>
        <title>AllPiq - Brands</title>
    </Helmet>
    <div className="container max-w-7xl mx-auto">
        <div className='flex flex-wrap gap-4 justify-center items-center '>
            {brandProd? <>
            {brandProd?.map((prod)=>{
            return <>
            <div className=' mt-25 p-3  w-full md:w-1/3 lg:w-1/4 bg-white border border-gray-200  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img src={prod?.image} className='w-full  flex justify-center items-center' alt={prod?.name} />
                <hr />
                <p className='p-5 text-lg text-blue-900 text-center'>{prod.name}</p>
            </div>
            </>
        })}
            </> : <Spinner/>}
        </div>
    </div>
    </>
}
