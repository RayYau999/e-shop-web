import { useSelector } from "react-redux";
import EShopCommonFetchProps from "../type/EShopCommonTypes";

const useGetJwt = () => {
    console.log("inside useGetJwt");
    const jwt: string = useSelector((state: any) => state.jwt);
    console.log("showing jwt in useGetJwt: ", jwt);
    return jwt
}

const fetchEShopData = async (props: EShopCommonFetchProps) => {
    const jwt = props.jwt ?? "";
    const controller = new AbortController();

    console.log("showing jwt in fetchEShopData: ", jwt);
    const res = await fetch(props.path, {
        method: props.method,
        headers: {
            'Authorization': 'Bearer ' + jwt.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: props.body ? JSON.stringify(props.body) : undefined,
        signal: controller.signal
    });

    return res;

}
export { fetchEShopData, useGetJwt };