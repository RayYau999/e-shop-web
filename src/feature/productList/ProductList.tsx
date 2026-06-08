// @ts-ignore
import React, {use, useState, useEffect} from 'react'
import {PUBLIC_ASSETS_URL} from "../../Constant";
import styles from "./productList.module.css"
import { useSelector, useDispatch } from 'react-redux';
import {addItem} from '../../state/cartSlice'
import { RootState } from "../../redux/store";
import { CreateNonPaidOrderResponse, EShopCommonFetchProps, Product } from "../type/EShopCommonTypes";
import { fetchEShopData, useGetJwt } from "../common/EShopCommonFetch";
import { APP_CONFIG } from "../../config/appConfig";

type ApiResult = { response: Response; data: Product[] };

const apiUrl = APP_CONFIG.SB_API_URL;

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
                path: apiUrl + '/product/all-products-on-sell',
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
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Products</h1>
                <div className={styles.cartBadge}>
                    Cart
                    <span className={styles.cartCount}>{cart.length}</span>
                </div>
            </div>

            <div className={styles.grid}>
                {products?.map(product =>
                    <div key={product.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.image} src={product.image} alt={product.name} />
                        </div>
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDesc}>{product.description}</p>
                        <div className={styles.priceRow}>
                            <span className={styles.price}>${product.price}</span>
                            <button className={styles.addButton} onClick={() => addItemToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
