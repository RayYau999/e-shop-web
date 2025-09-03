import { useNavigate } from "react-router-dom";

const PaymentConfirmationPage = ({ paymentDetails }) => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/"); // Redirect to the homepage or any desired route
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Successful!</h1>
                <p className="text-gray-700 mb-6">
                    Thank you for your purchase. Your payment has been successfully processed.
                </p>

                {/* Payment Details */}
                {paymentDetails && (
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md text-left mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                        <ul>
                            {paymentDetails.cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>
                    Quantity: {item.quantity || 1} | Price: ${item.price.toFixed(2)}
                  </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <p>
                                <strong>Total Paid:</strong> ${paymentDetails.total.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}

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