import { useContext } from "react";
import { Link } from "react-router"; // Fixed import path standard
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
// 1. Corrected Context Import: Reading from CartContext instead of AuthContext
import { CartContext } from "../provider/CartProvider"; 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/otherComponents/CheckoutForm"; 

// Initialize Stripe outside to prevent multiple recreations on re-render
const stripePromise = loadStripe("pk_test_51TaKiyFGfJfXJOGvNXAdeS4iDmVXXpDAniV1IkpcVJexfRQpNA5T5rzVKeKR1C6pPn37lFHv4jeJZy79sGDVqk8H00RBxWtzhK");

const Cart = () => {
    // 2. Consume data from correct CartContext
    const { cart, addToCart, clearCart } = useContext(CartContext);

    // Function to completely remove an item from the cart
    const handleRemoveItem = (product) => {
        const currentItem = cart.find(item => item._id === product._id);
        if (currentItem) {
            // Pass negative total quantity to bring it down to 0 and remove it
            addToCart(product, -currentItem.quantity);
        }
    };

    // Calculate subtotal, delivery fee, and grand total
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = cart.length > 0 ? 60 : 0; // Fixed delivery charge 60 Taka
    const total = subtotal + deliveryFee;

    // Render Empty Cart UI if no items are added
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag size={28} />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/shop" className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-green-600/10">
                        Explore Foods
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <Link to="/shop" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-bold text-sm transition">
                        <ArrowLeft size={18} /> Continue Shopping
                    </Link>
                    <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700 font-bold border border-red-100 bg-red-50/50 px-3 py-1.5 rounded-lg transition cursor-pointer">
                        Clear Cart
                    </button>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Shopping Cart ({cart.length})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: List of items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <img src={item.image || "https://placehold.co/100"} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-gray-400 capitalize mb-1">{item.category}</p>
                                        <p className="text-sm font-black text-orange-600">৳{item.price}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                                    {/* Counter Controllers */}
                                    <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 p-1">
                                        <button 
                                            onClick={() => addToCart(item, -1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:bg-gray-100 transition shadow-sm cursor-pointer"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                                        <button 
                                            onClick={() => addToCart(item, 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:bg-gray-100 transition shadow-sm cursor-pointer"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    {/* Delete Button */}
                                    <button 
                                        onClick={() => handleRemoveItem(item)}
                                        className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Calculations and Checkout Form */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-black text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-800">৳{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-bold text-gray-800">৳{deliveryFee}</span>
                            </div>
                            <div className="h-px bg-gray-100 my-2" />
                            <div className="flex justify-between text-base font-black text-gray-900">
                                <span>Total</span>
                                <span className="text-orange-600">৳{total}</span>
                            </div>
                        </div>

                        {/* Stripe Elements Provider Wrapper */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                Pay with Card (Demo)
                            </h3>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm totalAmount={total} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;