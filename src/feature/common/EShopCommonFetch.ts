import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { EShopCommonFetchProps } from "../type/EShopCommonTypes";
import { RootState } from "../../redux/store";
import { setError } from "../../state/errorSlice";

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
    const jwt = props.jwt;
    const controller = new AbortController();

    var customHeader: HeadersInit = {};

    if(typeof jwt !== 'undefined') {
        customHeader = {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } else {
        customHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    console.log("showing jwt in fetchEShopData: ", jwt);
    const res = await fetch(props.path, {
        method: props.method,
        headers: customHeader,
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

function useFetchEShopData() {
    const dispatch = useDispatch();

    const fetchWithError = useCallback(async function <T = any>(props: EShopCommonFetchProps): Promise<ApiResult<T>> {
        try {
            return await fetchEShopData<T>(props);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            dispatch(setError(message));
            throw err;
        }
    }, [dispatch]);

    return fetchWithError;
}

export { fetchEShopData, useFetchEShopData, useGetJwt };
