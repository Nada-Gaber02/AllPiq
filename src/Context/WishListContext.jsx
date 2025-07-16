import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext(0)

export default function WishListContextProvider(props){
        const [wishListId, setwishListId] = useState(null)
        const [wishListPrice, setwishListPrice] = useState(0)
        const [numOfWishListItems, setnumOfWishListItems] = useState(0)
        const [wishListProducts, setwishListProducts] = useState(null)

    const headers = {
        token: localStorage.getItem('userToken'),
    };

    function addToWishList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id,
        }, {
            headers,
        }).then((response) => {
            getUserWishList();
            return response;
        }).catch((error) => {
            return error;
        });
    }

    function getUserWishList() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((response) => {
                console.log(response.data);
                setwishListId(response?.data?.id);
                setwishListProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteWishList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            .then((response) => {
                getUserWishList();
                return response;
            }).catch((error) => {
                return error;
            });
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            getUserWishList();
        }
    }, []);



    return <wishListContext.Provider value={{addToWishList,wishListId ,setwishListId , wishListPrice, setwishListPrice , numOfWishListItems, setnumOfWishListItems , wishListProducts, setwishListProducts , deleteWishList}}>
        {props.children}
    </wishListContext.Provider>
}