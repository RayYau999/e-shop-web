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

export type PaymentStatus = {
    id: number;
    paymentId: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
    amount: number;
    currency: string;
}

export type PaymentStatusDto = {
    paymentId: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED';
    amount: number;
    currency: string;
}