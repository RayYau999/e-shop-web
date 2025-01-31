import logo from './logo.svg';
import './App.css';
import './feature/productList/ProductList.js'
import ProductList from './feature/productList/ProductList.js';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import Checkout from './Checkout.js';
import {useState, useRef} from "react";
import ProductDetail from "./feature/productDetails/ProductDetail.js";
import CommonHeader from './feature/commonHeader/CommonHeader.js';
import Cart from './feature/cart/Cart.js';

function App() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const handleButtonOnClick = () => {
    setStateCount(stateCount + 1);
    refCount.current++;
    
    console.log(stateCount + 1);
    console.log("refCount: " + parseInt(refCount.current));
    console.log("state setted: " + stateCount);
  }

  return (
    <div>
      <div>
        
        <BrowserRouter>
          <CommonHeader/>
            <Routes>
              <Route path='/' element={<ProductList/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/product_details/:id" element={<ProductDetail/>}/>
              <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
