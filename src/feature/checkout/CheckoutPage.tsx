import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import style from './CheckoutPage.module.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import PaypalButtonLogic from "../payment/PaypalButtonLogic";
import {useState, useEffect} from "react";
import { OrderReqDto, ProductDto } from "../type/EShopCommonTypes";
import { RootState } from "../../redux/store";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const cart = useSelector((state:RootState) => state.cart)
    const [countArray, setCountArray] = useState<Record<string, number>>({});
    const [isEmpty, setIsEmpty] = useState(false);
    const dispatch = useDispatch()
    const totalAmount:number = cart.items.reduce((total, product) => total + product.price, 0);
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;


    const findProductById = (id:string) => {
        return cart.items.find((product: { id: number; }) => product.id === parseInt(id))
    }

    const orderDto: OrderReqDto = {
        products: [],
        totalPrice: totalAmount
    };

    //This function is outdated because it will call many order query to DB
    // const setProductObjById = (id:string) => {
    //     const product = cart.items.find(product => product.id === parseInt(id));
    //     orderDto.products.push({productId: product?.id, quantity: countArray[id], price: product.price});
    //     console.log("pushed product to orderDto: ", orderDto);
    // }
    useEffect(() => {
        setCountArray(cart.items.reduce<Record<string, number>>((acc, product) => {
            const key = String(product.id);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {}));

        console.log(countArray);
        console.log("totalAmount: "+ totalAmount)
        console.log("show clientId", clientId)

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
                                    <Col xs={10} md={10} key={id}>
                                        <div className={style.cartContainer}>
                                            <div>Product name: {product.name}</div>
                                            <div>Number of order: {countArray[id]}</div>
                                            <div>Price: {product.price * countArray[id]}</div>
                                        </div>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                    <Row>total {totalAmount}</Row>

                    <h2>Pay now</h2>
                    <PayPalScriptProvider
                        options={{
                            clientId: clientId??"", // Replace with your actual PayPal Client ID
                            currency: "USD", // Adjust the currency code as needed
                        }}
                    >
                        <PaypalButtonLogic totalAmount={totalAmount} orderDto={orderDto}/>
                    </PayPalScriptProvider>
                </div>
            }

        </Container>
    )
}
