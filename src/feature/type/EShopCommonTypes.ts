export interface EShopCommonFetchProps {
    path: string,
    method: string,
    jwt: string,
    body?: any
}

export type OrderReqDto = {
    products: ProductDto[],
    totalPrice: number
}

export type ProductDto = {
    productId: string,
    price: number,
    quantity: number
}
