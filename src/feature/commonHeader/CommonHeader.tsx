import React from 'react'
import style from './CommonHeader.module.css'
import { Link } from 'react-router-dom'

const CommonHeader = () => {
    return (
        <div className={style.commonHeaderContainer}>
            <header>
                <h1>King Tsun's shopping center</h1>
            </header>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
        </div>
    )
}

export default CommonHeader
