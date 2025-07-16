import React, { useContext } from 'react';
import { wishListContext } from '../../Context/WishListContext';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function WishList() {
    let { wishListProducts, deleteWishList } = useContext(wishListContext);
    let { addToCart} = useContext(cartContext); 

    console.log(wishListProducts);

    async function handleDelete(id) {
        let response = await deleteWishList(id);
        console.log(response);
        if (response.data.status === 'success') {
            toast.success('Product deleted');
        } else {
            toast.error('Something went wrong');
        }
    }

    async function handleAddToCart(id) {
        try {
            let response = await addToCart(id);
            if (response?.data?.status === 'success') {
                toast.success('Product added to cart!');
                
            } else {
                toast.error('Failed to add product to cart.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred.');
        }
    }

    return (
        <>
    <Helmet>
        <title>AllPiq - Wish List</title>
    </Helmet>
            <div className="bg-white shadow-md rounded-md container max-w-7xl mx-auto p-5">
                <h2 className="font-semibold mb-4 mt-25 text-3xl">My Wish List :</h2>
                <ul className="mt-25">
                    {wishListProducts?.legnth? <>
                    {wishListProducts?.map((prod) => {
                        return (
                            <li key={prod._id} className="flex items-center justify-between py-2 border-b border-gray-300">
                                <div className="flex items-center">
                                    <img src={prod?.imageCover} alt={prod?.title} className="md:w-50 md:h-60 w-8 h-8  rounded-full mr-4" />
                                    <div>
                                        <span className="text-gray-800 font-semibold">{prod?.title.split(' ').slice(0,1).join(' ')}</span>
                                        <p>Price: {prod.price} EGP</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-5">
                                    <button
                                        onClick={() => handleAddToCart(prod._id)} 
                                        className="flex justify-center items-center bg-gradient-to-tr from-blue-950 to-purple-400 p-3 rounded-lg text-white cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                    <svg
                                        onClick={() => {
                                            handleDelete(prod._id);
                                        }}
                                        width={24}
                                        className="cursor-pointer flex justify-center items-center"
                                        height={25}
                                        viewBox="0 0 24 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z"
                                            stroke="#CB2F37"
                                            strokeMiterlimit={10}
                                        />
                                        <path
                                            d="M16 8.5L8 16.5"
                                            stroke="#CB2F37"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M16 16.5L8 8.5"
                                            stroke="#CB2F37"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </li>
                        );
                    })}
                    </> : 'There is No Wish List'}
                </ul>
                <Link to="/">
                    <button className="px-8 cursor-pointer py-3.5 rounded-[43px] text-blue-900 underline text-sm font-semibold leading-[16px]">
                        ← Return to shop
                    </button>
                </Link>
            </div>
        </>
    );
}