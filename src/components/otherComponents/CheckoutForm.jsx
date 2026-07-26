import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
// 1. Context Imports: reading cart, clearCart, and user details
import { CartContext } from "../../provider/CartProvider"; 
import { AuthContext } from "../../contexts/AuthContext"; 

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    
    // Consume states and actions from your contexts
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        // Visual Guard Clause: Ensure user is logged in before placing an order
        if (!user || !user.email) {
            setError("Please log in to complete your checkout.");
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Step 1: Request a Payment Intent Client Secret from the backend
            const response = await fetch("https://freshcart-backend-j35s.onrender.com/api/payment/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount }),
            });

            const data = await response.json();

            if (!data.clientSecret) {
                throw new Error(data.error || "Failed to get client secret");
            }

            // Step 2: Confirm the card payment via Stripe servers
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
            } else if (paymentIntent.status === "succeeded") {
                
                // Step 3: Map the cart payload data structurally for MongoDB orderModel
                const orderPayload = {
                    email: user.email,
                    items: cart.map(item => ({
                        foodId: item._id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.image
                    })),
                    totalAmount: totalAmount,
                    paymentStatus: "paid", // Confirmed payment intent status state
                    orderStatus: "Processing"
                };

                // Step 4: Write order payload records permanently to database storage
                const orderResponse = await fetch("https://freshcart-backend-j35s.onrender.com/api/orders", { // এন্ডপয়েন্টের শেষে আর বাড়তি কিছু থাকবে না
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload),
});

                const orderResult = await orderResponse.json();

                if (orderResult.success) {
                    setSuccess(true);
                    clearCart(); // Clear the local storage and state basket on success
                    alert("Payment Successful! Order Placed and Saved to Database.");
                } else {
                    throw new Error(orderResult.message || "Payment succeeded but order logging failed.");
                }

                setProcessing(false);
            }
        } catch (err) {
            setError(err.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />
            </div>

            {error && <p className="text-xs font-bold text-red-500">{error}</p>}
            {success && <p className="text-xs font-bold text-green-600">Payment completed successfully!</p>}

            <button
                type="submit"
                disabled={!stripe || processing || success}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-green-600/10 cursor-pointer"
            >
                {processing ? "Processing..." : `Pay ৳${totalAmount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;