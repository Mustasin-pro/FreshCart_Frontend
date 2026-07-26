import { Camera, User, Mail, Phone, Lock, Store } from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {
    const [role, setRole] = useState("customer");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false); // লোডিং স্টেট
    const { createAccount } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const username = event.target.username.value;
        const email = event.target.email.value;
        const phoneNumber = event.target.phoneNumber.value;
        const password = event.target.password.value;
        const storeName = event.target.storeName?.value || "";

        try {
            // ১. Firebase এ অ্যাকাউন্ট তৈরি
            const result = await createAccount(email, password);
            const user = result.user;

            // ২. FormData তৈরি
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("phoneNumber", phoneNumber);
            formData.append("password", password);
            formData.append("role", role);
            if (role === 'vendor') formData.append("storeName", storeName);
            if (image) formData.append("profileImage", image);

            // ৩. ব্যাকএন্ড API কল (JWT টোকেনসহ রেসপন্স আসবে)
            const response = await axios.post("https://freshcart-backend-j35s.onrender.com/auth/register", formData);

            if (response.data.success) {
                // ৪. JWT টোকেন ব্রাউজারে সেভ করা (গুরুত্বপূর্ণ)
                localStorage.setItem("token", response.data.token);

                // ৫. Firebase প্রোফাইল আপডেট
                await updateProfile(user, {
                    displayName: username,
                    photoURL: response.data.user.profileImage 
                });

                alert("Registration Successful!");
                navigate("/"); 
            }
        } catch (error) {
            console.error("Registration Error:", error);
            const errorMessage = error.response?.data?.message || error.message;
            
            if (errorMessage.includes("email-already-in-use")) {
                alert("This email is already registered!");
            } else {
                alert("Failed: " + errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    const iconColor = role === 'vendor' ? 'text-orange-600' : 'text-green-600';

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Logo Section */}
            <div className="py-8 flex justify-center">
                <Link to={"/"}>
                    <div className="text-2xl font-bold text-green-600 flex items-center">
                        <Store size={28} />
                        <h1 className="text-2xl font-extrabold text-green-600 tracking-tight">
                            Fresh<span className="text-orange-500">Cart</span>
                        </h1>
                    </div>
                </Link>
            </div>
            
            {/* Form Section */}
            <div className="flex justify-center items-center px-4">
                <div className="bg-white shadow-xl px-8 py-10 border rounded-2xl w-full max-w-md">  
                    <h1 className="text-2xl font-extrabold text-center text-gray-800">Join FreshCart</h1>
                    <p className="text-center text-gray-500 mb-6">Create an account to start shopping or selling</p> 

                    {/* Role Toggle */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative bg-slate-100 flex items-center border border-slate-200 rounded-xl p-1 w-fit">
                            <div className={`absolute top-1 bottom-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${role === 'customer' ? 'left-1' : 'left-[calc(50%+2px)]'}`} />
                            <button type="button" className={`relative z-10 flex items-center gap-2 px-6 py-2 font-bold transition-colors duration-300 ${role === 'customer' ? 'text-green-600' : 'text-slate-500'}`} onClick={() => setRole("customer")}> <User size={18} /> Customer </button>
                            <button type="button" className={`relative z-10 flex items-center gap-2 px-6 py-2 font-bold transition-colors duration-300 ${role === 'vendor' ? 'text-orange-600' : 'text-slate-500'}`} onClick={() => setRole("vendor")}> <Store size={18} /> Vendor </button>
                        </div>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                        {/* Profile Photo Upload */}
                        <div className="flex items-center flex-col mb-2">
                            <div className={`w-24 h-24 border-2 border-dashed rounded-full relative flex justify-center items-center transition-all ${role === 'vendor' ? 'bg-orange-50 border-orange-400' : 'bg-green-50 border-green-400'}`}>
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <Camera className={`${role === 'vendor' ? 'text-orange-600' : 'text-green-600'}`} size={32} />
                                )}
                                <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                            </div>
                            <p className="mt-2 text-xs font-bold text-gray-400">Upload Profile Photo</p>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700">User Name</label>
                            <div className="relative flex items-center mt-1">
                                <User size={20} className={`absolute left-3 ${iconColor}`} />
                                <input type="text" name="username" placeholder="Full Name" className="pl-10 pr-3 py-2 border w-full rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none transition" style={role === 'vendor' ? {borderColor: '#ea580c'} : {borderColor: '#16a34a'}} required />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700">Email</label>
                            <div className="relative flex items-center mt-1">
                                <Mail size={20} className={`absolute left-3 ${iconColor}`} />
                                <input type="email" name="email" placeholder="email@example.com" className="pl-10 pr-3 py-2 border w-full rounded-lg focus:outline-none" style={role === 'vendor' ? {borderColor: '#ea580c'} : {borderColor: '#16a34a'}} required />
                            </div>
                        </div>

                        {role === 'vendor' && (
                            <div className="animate-in fade-in duration-500">
                                <label className="text-sm font-bold text-gray-700">Store Name</label>
                                <div className="relative flex items-center mt-1">
                                    <Store size={20} className={`absolute left-3 ${iconColor}`} />
                                    <input type="text" name="storeName" placeholder="Your Shop Name" className="pl-10 pr-3 py-2 border w-full rounded-lg focus:outline-none" style={{borderColor: '#ea580c'}} required />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-bold text-gray-700">Phone Number</label>
                            <div className="relative flex items-center mt-1">
                                <Phone size={20} className={`absolute left-3 ${iconColor}`} />
                                <input type="text" name="phoneNumber" placeholder="017XXXXXXXX" className="pl-10 pr-3 py-2 border w-full rounded-lg focus:outline-none" style={role === 'vendor' ? {borderColor: '#ea580c'} : {borderColor: '#16a34a'}} required />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <div className="relative flex items-center mt-1">
                                <Lock size={20} className={`absolute left-3 ${iconColor}`} />
                                <input type="password" name="password" placeholder="••••••••" className="pl-10 pr-3 py-2 border w-full rounded-lg focus:outline-none" style={role === 'vendor' ? {borderColor: '#ea580c'} : {borderColor: '#16a34a'}} required />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className={`text-white py-3 rounded-lg font-bold mt-4 shadow-md transition-all active:scale-95 disabled:bg-gray-400 ${role === 'vendor' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                    
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account? <Link to={"/auth/login"} className="font-bold hover:underline" style={{color: role === 'vendor' ? '#ea580c' : '#16a34a'}}>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;