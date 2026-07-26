import { Link, useNavigate } from "react-router"; 
import { Mail, Lock, Store } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;
    
    try {
        // 1. Firebase Authentication verifies the password safely
        const result = await signInUser(email, password);
        console.log("Firebase Auth Success:", result.user);

        // 2. Fetch JWT Access Token from Backend using only verified email
        const response = await axios.post("https://freshcart-backend-j35s.onrender.com/auth/login", {
    email,
});

        if (response.data.success) {
            // 3. Save JWT Token to LocalStorage
            localStorage.setItem("token", response.data.token);
            
            alert("Login Successful!");
            navigate("/"); 
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
        setLoading(false);
    }
}

    return (
        <>
            {/* Top Brand Navbar Section */}
            <div className="py-4 flex justify-center">
                <Link to={"/"}>
                    <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                        <Store size={28} />
                        <h1 className="text-2xl font-extrabold text-green-600 tracking-tight cursor-pointer">
                            Fresh<span className="text-orange-500">Cart</span>
                        </h1>
                    </div>
                </Link>
            </div>

            {/* Login Form Card Section */}
            <div className="flex justify-center items-center min-h-[75vh] bg-white px-4 pb-12">
                <div className="shadow-2xl px-6 md:px-12 py-10 text-black bg-white rounded-2xl border border-gray-100 w-full max-w-lg">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <h1 className="text-center font-extrabold text-2xl">Welcome Back</h1>
                        <p className="text-center font-semibold text-gray-400 mb-2 text-sm">Login to manage your FreshCart account</p>
                        
                        {/* Email Input Field */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Email</label>
                            <div className="relative flex items-center">
                                <Mail size={20} className="absolute left-3 text-green-600" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your Email" 
                                    className="px-4 py-2.5 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none w-full border-gray-300 text-sm" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <div className="relative flex items-center">
                                <Lock size={20} className="absolute left-3 text-green-600" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter your Password" 
                                    className="px-4 py-2.5 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none w-full border-gray-300 text-sm" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Login Button */}
                        <button 
                            disabled={loading}
                            className="bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg mt-4 active:scale-95 disabled:bg-gray-400" 
                            type="submit"
                        >
                            {loading ? "Verifying..." : "Login"}
                        </button>
                        
                        {/* Link to Registration Form */}
                        <p className="text-center mt-2 text-sm text-gray-600">
                            Don't have an account? <Link to={"/auth/register"} className="text-green-600 font-extrabold hover:underline">Create Account</Link>
                        </p>
                    </form>

                    {/* Standard Visual Divider with Horizontal Rules */}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-semibold tracking-wider">or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Social Login Auth Provider Component */}
                    <GoogleLogin />
                </div>
            </div>
        </>
    )
}

export default Login;