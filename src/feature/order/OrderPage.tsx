import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchEShopData, useGetJwt} from '../common/EShopCommonFetch'
import {EShopCommonFetchProps} from "../type/EShopCommonTypes";
import {Button} from 'react-bootstrap';
const OrderPage = () => {
    // const jwt = useSelector((state: any) => state.jwt)
    const jwt = useGetJwt();
    const controller = new AbortController();

    const reqData: EShopCommonFetchProps = {
        path: 'http://localhost:8081/orders/1/1',
        method: 'GET',
        jwt: jwt
    }
    useEffect(() => {

        console.log("jwt in order page: ", jwt)
        async function fetchData() {
            const res = await fetch('http://localhost:8081/orders/1/1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });
            console.log("res: ", await res.json());
        }
        try {
            console.log("showing reqData in order page: ", reqData);
            fetchEShopData(reqData);
            console.log("trying fetching EShop data");
        } catch (e) {
            console.log("error in fetching orders: ", e);
        }
    }, []);

    const handleTesting = () => {
        fetchEShopData(reqData);
    }
    return (
        <>
            this is order page
            <Button onClick={handleTesting}>
                Test Button
            </Button>
        </>
    )
}

export default  OrderPage;