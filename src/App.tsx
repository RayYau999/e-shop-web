import './App.css';
import ProductList from './feature/productList/ProductList';
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import Checkout from './Checkout.js';
import {useState, useRef, useEffect} from "react";
import ProductDetail from "./feature/productDetails/ProductDetail";
import CommonHeader from './feature/commonHeader/CommonHeader';
import Cart from './feature/cart/Cart';
// import Login from "./feature/login/LoginPage";
import Registration from "./feature/registration/RegistrationPage";
// import Chatbot from "./feature/chatbot/Chatbot";
import LoginPageWithSb from "./feature/login/LoginPageWithSb";
import PaymentConfirmationPage from "./feature/payment/PaymentConfirmationPage";
import PaymentErrorPage from "./feature/payment/PaymentErrorPage";
import CheckoutPage from "./feature/checkout/CheckoutPage";
import OrderPage from "./feature/order/OrderPage";
function App() {
    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);
    //for login token
    const [token, setToken] = useState<string>();
    const [isRegister, setIsRegister] = useState<boolean>(false);
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
                {/*<Chatbot />*/}
            </div>
        </div>
    );
}

export default App;
