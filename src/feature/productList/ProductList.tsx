// @ts-ignore
import React, {use, useState, useEffect} from 'react'
import {PUBLIC_ASSETS_URL} from "../../Constant";
import style from "./productList.module.css"
import { useSelector, useDispatch } from 'react-redux';
import {addItem} from '../../state/cartSlice'
import { RootState } from "../../redux/store";
import { Product } from "../type/EShopCommonTypes";

export default function ProductList() {

    let productList: Product[] = [
        {"id": 1, "name": "Apple", "price": 10, "image": "apple.png", "description": "this is apple"},
        {"id": 2, "name": "Orange", "price": 5, "image": "orange.png", "description": "this is orange"}
    ]
    const [product, setProduct] = useState()

    const dispatch = useDispatch()
    const cart = useSelector((state:RootState) => state.cart)

    const addItemToCart = (product: Product) => {
        console.log("clicked add to cart")
        dispatch(addItem(product))
    }


    useEffect(() => {
        console.log('cart:', cart); // This will log the updated state
    }, [cart]);

    return (

    <div>
    
        <h3>Choose your product</h3>
        <div>
            <span>Cart: {cart.length}</span>
        </div>
 
        <div className={style.productListContainer}>
            
            <div className={style.productListDiv}>
                {
                    productList.map(product =>
                        <div key={product.id} className={style.productItem}>
                            {product.name}<br/>
                             price: {product.price}<br/>
                            <img className={style.productImage} src={PUBLIC_ASSETS_URL + product.image} alt="product pic"></img><br/>
                            {product.description}<br/>
                            <button onClick={() => addItemToCart(product)}>Add to cart</button>
                        </div>
                    )
                }
            </div>

        </div>
    </div>
  )
}
