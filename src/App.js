import logo from './logo.svg';
import './App.css';
import './feature/productList/ProductList.js'
import ProductList from './feature/productList/ProductList.js';
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import Checkout from './Checkout.js';
import {useState, useRef, useEffect} from "react";
import ProductDetail from "./feature/productDetails/ProductDetail.js";
import CommonHeader from './feature/commonHeader/CommonHeader.js';
import Cart from './feature/cart/Cart.js';
import Login from "./feature/login/LoginPage.tsx";
import Registration from "./feature/registration/RegistrationPage";
import Chatbot from "./feature/chatbot/Chatbot.tsx";
import LoginPageWithSb from "./feature/login/LoginPageWithSb.tsx";
import PaymentConfirmationPage from "./feature/payment/PaymentConfirmationPage.tsx";
import PaymentErrorPage from "./feature/payment/PaymentErrorPage.tsx";
import CheckoutPage from "./feature/checkout/CheckoutPage.tsx";
import OrderPage from "./feature/order/OrderPage.tsx";
function App() {
    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);
    //for login token
    const [token, setToken] = useState();
    const [isRegister, setIsRegister] = useState(false);
    const whitelist = [''];
    const location = useLocation();

    if (!token && !whitelist.includes(location.pathname)) {
        console.log("isRegister: ", isRegister)
        if(isRegister){
            return <Registration/>
        }
        return <LoginPageWithSb setToken={setToken} setIsRegister={setIsRegister}/>
    }


    return (
        <div>
            <div>


                <CommonHeader />
                <Routes>
                    <Route path='/' element={<ProductList />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/product_details/:id" element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/payment-success' element={<PaymentConfirmationPage />} />
                    <Route path='/payment-error' element={<PaymentErrorPage />} />
                    <Route path='/view-order' element={<OrderPage />} />

                </Routes>
                <Chatbot />
            </div>
        </div>
    );
}

export default App;
