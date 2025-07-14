import React, { use, useContext, useEffect, useState } from 'react'
import styles from './HomeProducts.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import { wishListContext } from '../../Context/WishListContext'
import { useQuery } from '@tanstack/react-query'


export default function HomeProducts() {
    const [homeProd, setHomeProd] = useState(null)
    const [wishlistItems, setWishlistItems] = useState([]); 

    function HomeProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let {data} = useQuery({
        queryKey:['products'],
        queryFn :HomeProducts,
        select: (data)=>{
        return data.data.data
    }
    })

    let {addToCart}= useContext(cartContext)

    async function handleAddToCart(id){
        let response = await addToCart(id)
        console.log(response);
        if(response?.data?.status === 'success'){
            toast.success('Product Added to Cart')
        }else{
            toast.error("Something Went Wrong")
        }
    }

    let {addToWishList}= useContext(wishListContext)

    async function handleAddToWishList(id){
        let response = await addToWishList(id)
        console.log(response);
        if(response?.data?.status === 'success'){
            toast.success('Product Added to whish List')
            setWishlistItems((prev) => [...prev, id]);
            return <i class="fa-solid fa-heart px-4 text-2xl" style="color: #ed2c2c;"></i>
        }else{
            toast.error("Something Went Wrong")
        }
    }


    useEffect(()=>{
        HomeProducts()
    },[])

    return <>
    {data?.length > 0? 
    <div className='container max-w-7xl mx-auto font-bold '>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
            {data?.map((prod)=>{
                const isInWishlist = wishlistItems.includes(prod._id);
                return (
                    <div key={prod.id} className=' mt-25'>
                        <div className='bg-white border border-gray-100 m-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <Link to={`/ProductDetails/${prod._id}/${prod.category.name}`}>
                                <img src={prod.imageCover} alt={prod.title} className='w-full  object-cover rounded-t-lg' />
                                <div className='p-4 '>
                                    <h3 className='text-lg text-blue-900 font-semibold'>{prod.title.split(' ').slice(0,1).join(' ')}</h3>
                                    <p className='text-purple-500'>{prod.category.name}</p>
                                    <div className="flex justify-between">
                                        <span className='text-blue-900 font-bold'>{prod.price} EGP</span>
                                        <span><i className='fas fa-star text-yellow-400 '></i>{prod.ratingsAverage}</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between pt-4 gap-5">
                                <button onClick={()=>{handleAddToCart(prod._id)}} className='w-full flex justify-center items-center bg-gradient-to-tr from-blue-950 to-purple-400 p-4 rounded-b-lg rounded-tr-lg text-white cursor-pointer'>Add To Cart</button>
                                <i onClick={()=>{handleAddToWishList(prod._id)}} class={`fa-heart px-4 text-2xl cursor-pointer ${isInWishlist ? 'fa-solid text-red-500' : 'fa-regular text-black'}`}></i>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div> : <Spinner/> }
    
    </>
}
