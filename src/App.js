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
import Login from "./feature/login/LoginPage";
import Registration from "./feature/registration/RegistrationPage";

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
        return <Login setToken={setToken} setIsRegister={setIsRegister}/>
    }


    return (
        <div>
            <div>


                <CommonHeader />
                <Routes>
                    <Route path='/' element={<ProductList />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/product_details/:id" element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
