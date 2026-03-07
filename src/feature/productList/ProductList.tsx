// @ts-ignore
import React, {use, useState, useEffect} from 'react'
import {PUBLIC_ASSETS_URL} from "../../Constant";
import style from "./productList.module.css"
import { useSelector, useDispatch } from 'react-redux';
import {addItem} from '../../state/cartSlice'
import { RootState } from "../../redux/store";
import { CreateNonPaidOrderResponse, EShopCommonFetchProps, Product } from "../type/EShopCommonTypes";
import { fetchEShopData, useGetJwt } from "../common/EShopCommonFetch";

type ApiResult = { response: Response; data: Product[] };

export default function ProductList() {

    const jwt = useGetJwt();

    let productList: Product[] = [
        {"id": 1, "name": "Apple", "price": 10, "image": "apple.png", "description": "this is apple"},
        {"id": 2, "name": "Orange", "price": 5, "image": "orange.png", "description": "this is orange"}
    ]
    const [products, setProducts] = useState<Product[] | undefined>()

    const dispatch = useDispatch()
    const cart = useSelector((state:RootState) => state.cart)

    const addItemToCart = (product: Product) => {
        console.log("clicked add to cart")
        dispatch(addItem(product))
    }


    useEffect(() => {
        console.log('cart:', cart); // This will log the updated state
        let cancelled = false;
        const fetchProducts = async (): Promise<void> => {
            const reqData: EShopCommonFetchProps = {
                path: 'http://localhost:8083/product/all-products-on-sell',
                method: 'GET',
                jwt: jwt
            };

            try {
                const apiResult: ApiResult = await fetchEShopData(reqData);
                if (!cancelled) setProducts(apiResult.data);
            } catch (err) {
                if (!cancelled) console.error('Failed to fetch products', err);
            }
        };

        fetchProducts();

        return () => {
            cancelled = true;
        };
    }, [cart, jwt]);

    return (

    <div>
    
        <h3>Choose your product</h3>
        <div>
            <span>Cart: {cart.length}</span>
        </div>
 
        <div className={style.productListContainer}>
            
            <div className={style.productListDiv}>
                {
                    products?.map(product =>
                        <div key={product.id} className={style.productItem}>
                            {product.name}<br/>
                             price: {product.price}<br/>
                            <img className={style.productImage} src={product.image} alt="product pic"></img><br/>
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
