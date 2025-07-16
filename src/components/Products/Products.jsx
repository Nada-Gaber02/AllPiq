import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { cartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Products() {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [products, setProducts] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [wishlistItems, setWishlistItems] = useState([]); 
    const { addToCart } = useContext(cartContext);
    const { addToWishList } = useContext(wishListContext);


    function getProducts() {
        setIsLoading(true); 
        axios.get('https://ecommerce.routemisr.com/api/v1/products').then(({ data }) => {
                setProducts(data?.data);
                setFilteredProducts(data?.data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
    getProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleAddToCart = (id) => {
        addToCart(id)
            .then((response) => {
                if (response?.data?.status === 'success') {
                    toast.success('Product added to cart!');
                    ;
                } else {
                    toast.error('Failed to add product to cart.');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('An error occurred.');
            });
    };


    const handleAddToWishList = (id) => {
        addToWishList(id)
            .then((response) => {
                if (response?.data?.status === 'success') {
                    toast.success('Product added to wishlist!');
                    setWishlistItems((prev) => [...prev, id]);
                } else {
                    toast.error('Failed to add product to wishlist.');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('An error occurred.');
            });
    };

    return <>
        <Helmet>
            <title>AllPiq - Products</title>
        </Helmet>
            <div className="container mx-auto max-w-7xl">
            <input
                type="text"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-35 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
        </div>

        
            <div className="container max-w-7xl mx-auto mt-5">
                {isLoading ? (
                    <Spinner />
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((prod) => (
                            <div key={prod._id} className="bg-white border border-gray-100 m-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Link to={`/ProductDetails/${prod._id}/${prod.category.name}`}>
                                    <img src={prod.imageCover} alt={prod.title} className="w-full object-cover rounded-t-lg" />
                                    <div className="p-4">
                                        <h3 className="text-lg text-blue-900 font-semibold">{prod.title.split(' ').slice(0, 1).join(' ')}</h3>
                                        <p className="text-purple-500">{prod.category.name}</p>
                                        <div className="flex justify-between">
                                            <span className="text-blue-900 font-bold">{prod.price} EGP</span>
                                            <span>
                                                <i className="fas fa-star text-yellow-400"></i>
                                                {prod.ratingsAverage}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex items-center justify-between pt-4 gap-5">
                                    <button
                                        onClick={() => handleAddToCart(prod._id)}
                                        className="w-full flex justify-center items-center bg-gradient-to-tr from-blue-950 to-purple-400 p-4 rounded-b-lg rounded-tr-lg text-white cursor-pointer"
                                    >
                                        Add To Cart
                                    </button>
                                    <i
                                        onClick={() => handleAddToWishList(prod._id)}
                                        className={`fa-heart px-4 text-2xl cursor-pointer ${
                                            wishlistItems.includes(prod._id) ? 'fa-solid text-red-500' : 'fa-regular text-black'
                                        }`}
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </>
}