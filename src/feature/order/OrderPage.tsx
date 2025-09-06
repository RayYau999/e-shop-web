import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OrderPage = () => {
    const jwt = useSelector((state: any) => state.jwt)

    const controller = new AbortController();
     useEffect(() => {
         console.log("jwt in order page: ", jwt)

         async function fetchData() {
             const res = await fetch('http://localhost:8081/orders/1/1', {
                 method: 'GET',
                 headers: {
                     'Authorization': 'Bearer ' + jwt.token,
                     'Accept': 'application/json'
                 },
                 signal: controller.signal
             });

             console.log("res: ", await res.json());
         }
         try {
             fetchData();
         } catch (e) {
                console.log("error in fetching orders: ", e);
         }
     }, []);
    return (
        <>
        this is order page
        </>
    )
}

export default  OrderPage;