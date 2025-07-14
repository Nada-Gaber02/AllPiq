import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function Categories() {

    const [category, setcategory] = useState(null)
    function getCategories(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
            setcategory(data?.data)
            console.log('category' , data?.data);
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getCategories()
    } , [])
    return <>
    <div className='container max-w-7xl mx-auto'>
    <h2 className='text-green-600 text-2xl font-bold '>Shop Popular Categories</h2>
        <div className='flex flex-wrap gap-4 justify-center items-center '>
            {category? <>
            {category?.map((category)=>{
            return <>
            <div className=' mt-25 p-3  w-full md:w-1/3 lg:w-1/4 bg-white border border-gray-200  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img src={category?.image} className='w-full h-[400px] flex justify-center items-center' alt={category?.name} />
                <hr />
                <p className='p-5 text-lg text-blue-900 text-center'>{category.name}</p>
            </div>
            </>
        })}
            </> : <Spinner/>}
        </div>
    </div>
    </>
}
