import { useSelector } from "react-redux";
import { EShopCommonFetchProps } from "../type/EShopCommonTypes";
import { RootState } from "../../redux/store";

type ApiResult<T> = { response: Response; data: T };

const useGetJwt = ():string => {
    console.log("inside useGetJwt");
    const jwt = useSelector((state: RootState) => state.jwt);
    console.log("showing jwt in useGetJwt: ", jwt);
    if(jwt.token === undefined) {
        throw new Error(`jwt token is undefined`);
    } else {
        return jwt.token;
    }
}

async function fetchEShopData<T = any>(props: EShopCommonFetchProps): Promise<ApiResult<T>> {
    const jwt = props.jwt ?? "";
    const controller = new AbortController();

    console.log("showing jwt in fetchEShopData: ", jwt);
    const res = await fetch(props.path, {
        method: props.method,
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: props.body ? JSON.stringify(props.body) : undefined,
        signal: controller.signal
    });

    if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(`Network error: ${res.status} ${text}`);
    }
    const data = await res.json().catch(() => (undefined as unknown as T));
    return { response: res, data };

}

export { fetchEShopData, useGetJwt };