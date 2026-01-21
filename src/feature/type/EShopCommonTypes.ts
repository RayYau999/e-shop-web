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

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export interface PaypalOptions {
    clientId: string;
    currency?: string;
}