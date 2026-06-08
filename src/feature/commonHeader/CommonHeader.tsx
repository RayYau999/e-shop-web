import React from 'react'
import styles from './CommonHeader.module.css'
import { Link } from 'react-router-dom'

const CommonHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoIcon}>KT</span>
                    KT E-Shop
                </Link>

                <ul className={styles.nav}>
                    <li><Link to="/" className={styles.navLink}>Home</Link></li>
                    <li><Link to="/checkout" className={styles.navLink}>Checkout</Link></li>
                    <li><Link to="/cart" className={styles.navLink}>Cart</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default CommonHeader
