import { useNavigate, useLocation } from "react-router-dom";
import { EShopCommonFetchProps, PaymentStatus } from "../type/EShopCommonTypes";
import { useEffect } from "react";
import { fetchEShopData, useGetJwt } from "../common/EShopCommonFetch";

const PaymentConfirmationPage = () => {
    const navigate = useNavigate();
    const paymentDetails: PaymentStatus = useLocation().state.paymentDetails;
    const handleBackToHome = () => {
        navigate("/"); // Redirect to the homepage or any desired route
    };
    const jwt = useGetJwt();

    const reqData: EShopCommonFetchProps = {
        path: `http://localhost:8081/after-payment/${paymentDetails.paymentId}`,
        method: 'GET',
        jwt: jwt
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("PaymentDetails in PaymentConfirmationPage: ", paymentDetails);
            const response: any = await fetchEShopData(reqData);
            // handle response if needed
            console.log("Payment confirm email response: " + response);
        };
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">
                    Thank you for your purchase. Your payment has been successfully processed.
                </p>

                <button
                    onClick={handleBackToHome}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentConfirmationPage;