
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PayPalButtonLogic = ({ totalAmount }) => {
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handlePaymentSuccess = async (details) => {
        console.log("Payment Successful:", details);
        setLoading(true); // Show loading indicator

        const captureId = details.purchase_units?.[0]?.payments?.captures?.[0]?.id;

        if (!captureId) {
            console.error("Capture ID not found.");
            alert("An error occurred while processing your payment. Please contact support.");
            setLoading(false);
            return;
        }

        // Timer variables
        const maxAttempts = 7;
        const retryInterval = 3000;

        let attempts = 0;

        const checkPaymentStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5002/payment-status/${captureId}`);
                const paymentStatus = await response.json();

                if (response.ok && paymentStatus.status === "COMPLETED") {
                    console.log("Payment confirmed:", paymentStatus);
                    navigate("/payment-success", { state: { paymentDetails: paymentStatus.details } });
                    setLoading(false); // Stop loading
                    return; // Exit function after success
                } else {
                    console.log("Payment still pending...");
                }
            } catch (error) {
                console.error("Error while checking payment status:", error.message);
            }

            // Retry logic
            attempts += 1;
            if (attempts < maxAttempts) {
                setTimeout(checkPaymentStatus, retryInterval); // Retry after the interval
            } else {
                console.error("Max retries reached. Payment verification failed.");
                alert("Payment verification timed out. Please contact support.");
                navigate("/error");
                setLoading(false); // Stop loading
            }
        };

        // Start the first check
        checkPaymentStatus();
    };

    return (
        <>
            {loading && <div>Loading... Please wait</div>}
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: totalAmount.toFixed(2),
                                },
                            },
                        ]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(handlePaymentSuccess);
                }}
                onError={(err) => {
                    console.error("PayPal Checkout Error:", err);
                    alert("An error occurred during the payment process. Please try again.");
                    navigate("/error");
                }}
            />
        </>
    );
};

export default PayPalButtonLogic;