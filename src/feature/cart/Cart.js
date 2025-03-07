import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {PUBLIC_ASSETS_URL} from "../../Constant";
import {clearItems} from '../../state/cartSlice'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Item from '@mui/material/Grid';
import {Container, Row, Col, Button} from 'react-bootstrap';
import style from './Cart.module.css'

export default function Cart() {
    const cart = useSelector((state) => state.cart)
    const [countArray, setCountArray] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const dispatch = useDispatch()

    const handleClearCartClick = () => {
        dispatch(clearItems());
    }

    const findProductById = (id) => {
        return cart.items.find(product => product.id === parseInt(id))
    }
    useEffect(() => {
        setCountArray(cart.items.reduce((acc, product) => {
            acc[product.id] = (acc[product.id] || 0) + 1;
            return acc;
        }, {}));

        console.log(countArray);

        setIsEmpty(cart.items.length === 0);
    }, [cart.items]);

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
                    <Button variant="primary" onClick={handleClearCartClick}>
                        Clear cart
                    </Button></div>
            }

        </Container>
    );
}