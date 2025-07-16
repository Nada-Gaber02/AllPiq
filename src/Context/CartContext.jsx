import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext(0)

export default function CartContextProvider(props){
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let token = localStorage.getItem('userToken')

    const [cartId, setcartId] = useState(null)
    const [totalPrice, settotalPrice] = useState(0)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartProducts, setcartProducts] = useState(null)

    function addToCart(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId : id
        } , {
            headers
        }).then((response)=>{
            getUserCartItem()
            return response
        }).catch((error)=>{
            return error
        })
    }

    function getUserCartItem(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers})
        .then((response)=>{
            console.log('cart data',response);
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setcartProducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            // console.log(response);

        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if (token){
            getUserCartItem()
        }
    } , [token])

    function update(id , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id} ` , {
            count : count
        } , {headers}).then
        ((response)=>{
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setcartProducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            return response
        }).catch((error)=>{
            return error
        })
    }

    function deleteProd(prodId ){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId} ` , 
            {headers}).then
        ((response)=>{
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setcartProducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            return response
        }).catch((error)=>{
            return error
        })
    }

    function resetCart(){
        setcartId(null)
        setcartProducts(null)
        settotalPrice(0)
        setnumOfCartItems(0)
    }



    return <cartContext.Provider value={{addToCart,cartId , numOfCartItems , cartProducts , totalPrice , update , deleteProd , resetCart}}>
        {props.children}
    </cartContext.Provider>
}