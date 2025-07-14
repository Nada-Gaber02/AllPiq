import React, { use, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const [prodDetails, setProdDetails] = useState(null)
    const [relatedProd, setRelatedProd] = useState(null)
    let {id , category} = useParams()
    function relatedProduct(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
            let related = data?.data.filter((prod)=>{
                return prod.category.name === category
            })
            setRelatedProd(related)
            console.log('related' , related);
            
        })
    }
    function productDetails(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
            // console.log(data?.data);
            setProdDetails(data?.data)
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    useEffect(()=>{
        productDetails()
        relatedProduct()
        window.scrollTo({ top: 0, behavior: "smooth" });
    },[id])

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };


    return <>
    <Helmet>
        <title>AllPiq - Product Details</title>
    </Helmet>
    {prodDetails?
    <div className="container max-w-7xl mx-auto">
        <div className='flex flex-wrap items-center '>
            <div className="w-full md:w-1/4 p-5 mt-25">
                <Slider {...settings}>
                    {prodDetails?.images.map((img)=>{
                        return <img src={img} className='w-full' alt={prodDetails?.title} />
                    })}
                </Slider>
            </div>
            <div className="w-full md:w-3/4">
                <h3 className='text-3xl text-blue-900'>{prodDetails?.title}</h3>
                <p className='text-purple-500 text-xl my-5'>{prodDetails?.description}</p>
                <p className='text-blue-900 font-bold text-lg'>{prodDetails?.category.name} </p>
                <div className="flex justify-between my-5">
                    <span className='text-lg text-blue-900'>{prodDetails?.price} EGP</span>
                    <span><i className='fas fa-star text-yellow-400 '></i>{prodDetails?.ratingsAverage}</span>
                </div>
                <button className='w-full bg-gradient-to-tr from-blue-900 to-purple-400 text-white rounded-md py-2 my-2 cursor-pointer'>Add to Cart</button>
            </div>
        </div>
    </div> : <Spinner/>
    }
    <div className='my-10 w-full container mt-20 max-w-7xl mx-auto'>
            <h4 className='font-bold text-xl text-blue-900'>Related Products :</h4>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
            {relatedProd?.map((prod)=>{
                return <div key={prod.id} className="box w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
            <div className='bg-white border border-gray-100 mb-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <Link to={`/ProductDetails/${prod._id}/${prod.category.name}`}>
                    <img src={prod.imageCover} alt={prod.title} className='w-full  object-cover rounded-t-lg' />
                    <div className='p-5'>
                        <h3 className='text-lg text-blue-900 font-semibold'>{prod.title.split(' ').slice(0,1).join(' ')}</h3>
                        <p className='text-purple-500'>{prod.category.name}</p>
                        <div className="flex justify-between">
                            <span className='text-blue-900 font-bold'>{prod.price} EGP</span>
                            <span><i className='fas fa-star text-yellow-400 '></i>{prod.ratingsAverage}</span>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center justify-between pt-4 gap-5">
                    <button className='w-full flex justify-center items-center bg-gradient-to-tr from-blue-950 to-purple-400 p-4 rounded-b-lg rounded-tr-lg text-white cursor-pointer'>Add To Cart</button>
                    <i class="fa-regular fa-heart px-4 text-2xl"></i>
                </div>
            </div>
        </div>
            })}
        </div>
    </>
}
