import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../state/cartSlice'
import { Container, Row, Col, Button } from 'react-bootstrap';
import style from './Cart.module.css'
import { useNavigate } from "react-router-dom";
import { Product } from "../type/EShopCommonTypes";
import type { RootState } from '../../redux/store';

type CountMap = Record<string, number>;

export default function Cart() {
    const navigate = useNavigate();
    const cart = useSelector((state:RootState) => state.cart)
    const [countArray, setCountArray] = useState<CountMap>({});
    const [isEmpty, setIsEmpty] = useState(false);
    const dispatch = useDispatch()
    const totalAmount = cart.items.reduce((total:any, product:any) => total + product.price, 0);

    const handleClearCartClick = () => {
        dispatch(clearItems());
    }

    const findProductById = (id: string) => {
        return cart.items.find(product => product.id === parseInt(id))
    }
    useEffect(() => {
        const counts = cart.items.reduce((acc: CountMap, product: Product) => {
            const key = product.id.toString();
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as CountMap);

        console.log(countArray);
        console.log("totalAmount: " + totalAmount)
        setCountArray(counts);
        setIsEmpty(cart.items.length === 0);
    }, [cart.items]);

    const handlePayNowClick = () => {
        console.log("pay now clicked");
        navigate("/checkout");
    }

    const handlePaymentSuccess = () => {
        console.log("Payment successful!");
    }

    const handlePaymentError = () => {
        console.log("Payment error!");
    }
    return (
        <Container>
            <h2>Check your cart</h2>
            {isEmpty && <div>Your cart is empty</div>}
            {!isEmpty &&
                <div>
                    <Row>
                        {
                            Object.keys(countArray).map(id => {
                                const product = findProductById(id);
                                if (!product) return null; //to prevent undefined product
                                return (
                                    <>
                                        <Col xs={10} md={10} key={id}>
                                            <div className={style.cartContainer}>
                                                <div>Product name: {product.name}</div>
                                                <div>Number of order: {countArray[id]}</div>
                                                <div>Price: {product.price * countArray[id]}</div>
                                            </div>
                                        </Col>
                                    </>
                                );
                            })
                        }
                    </Row>
                    <Row>total {totalAmount}</Row>
                    <Button variant="primary" onClick={handleClearCartClick}>
                        Clear cart
                    </Button>
                </div>
            }

        </Container>
    );
}