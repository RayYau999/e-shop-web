import { useNavigate } from "react-router-dom";

const PaymentErrorPage = () => {
    const navigate = useNavigate();

    const handleBackToCheckout = () => {
        navigate("/checkout"); // Redirect to the checkout page
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed!</h1>
                <p className="text-gray-700 mb-6">
                    Unfortunately, your payment could not be processed. Please try again.
                </p>
                <button
                    onClick={handleBackToCheckout}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                >
                    Back to Checkout
                </button>
            </div>
        </div>
    );
};

export default PaymentErrorPage;
