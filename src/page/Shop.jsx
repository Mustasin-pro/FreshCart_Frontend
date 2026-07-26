import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; 
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../provider/CartProvider"; 
import { Search, Handbag, UserRound, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = ({ activeCategory = "Home", onCategoryChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [catMenuOpen, setCatMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    
    const { user, logOut } = useContext(AuthContext); 
    const { cart } = useContext(CartContext); 
    const navigate = useNavigate(); 

    // Static sub-navbar items as requested in your wireframe
    const navItems = ["Home", "Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Deals"];

    const handleLogOut = () => {
        logOut().then(() => setDropdownOpen(false)).catch(err => console.error(err));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm.trim()}`);
        }
    };

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            
            {/* ─── LAYER 1: TOP BANNER ─── */}
            <div className="w-full bg-green-700 text-white py-2 px-6 text-xs md:text-sm font-semibold tracking-wide">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <span>🚚 Free Delivery Over ৳500</span>
                    <span className="hidden sm:inline">🌱 Fresh & Organic Products Everyday</span>
                </div>
            </div>

            {/* ─── LAYER 2: MAIN HEADER (Logo, Category Trigger, Search, Actions) ─── */}
            <div className="w-full border-b border-gray-100 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
                    
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            Fresh<span className="text-green-600">Cart</span>
                        </h1>
                    </Link>

                    {/* Category Dropdown Trigger (Dynamic Toggle Menu) */}
                    <div className="relative hidden lg:block">
                        <button 
                            onClick={() => setCatMenuOpen(!catMenuOpen)}
                            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/60 font-bold text-gray-700 px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                        >
                            Categories <ChevronDown size={14} className={`transition-transform duration-200 ${catMenuOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {catMenuOpen && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                {navItems.filter(i => i !== "Home" && i !== "Deals").map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            if(onCategoryChange) onCategoryChange(cat);
                                            setCatMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Core Search Bar Integration */}
                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-4">
                        <div className="w-full flex items-center relative">
                            <input 
                                type="text" 
                                placeholder="Search for fresh items, grocery essentials..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-green-500 pl-4 pr-10 py-2.5 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:bg-white transition-all placeholder-gray-400"
                            />
                            <button type="submit" className="absolute right-3 text-gray-400 hover:text-green-600 cursor-pointer">
                                <Search size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Action Hub: Cart and Profile Avatar */}
                    <div className="flex items-center gap-5 shrink-0">
                        {/* Cart Action Hook */}
                        <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-xl transition group">
                            <Handbag size={22} className="text-gray-600 group-hover:text-green-600 transition-colors" />
                            <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                                {cart?.length || 0}
                            </span>
                        </Link>

                        {/* User Identity / Authentication System */}
                        {user ? (
                            <div className="relative flex items-center gap-2">
                                <button 
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden bg-gray-50 cursor-pointer shadow-sm active:scale-95 transition"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserRound className="w-full h-full p-2 text-green-600" />
                                    )}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-green-600 transition">
                                            <LayoutDashboard size={14} /> Dashboard
                                        </Link>
                                        <hr className="border-gray-100 my-1" />
                                        <button onClick={handleLogOut} className="flex items-center gap-2 w-full px-4 py-2 text-xs font-black text-red-600 hover:bg-red-50 text-left transition">
                                            <LogOut size={14} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/auth/login" className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-sm shadow-green-600/10">
                                <UserRound size={14} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ─── LAYER 3: DYNAMIC NAVIGATION & FILTER BAR ─── */}
            <div className="w-full bg-white border-b border-gray-50 overflow-x-auto no-scrollbar">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-2.5 flex items-center gap-1.5 md:gap-3">
                    {navItems.map((item) => {
                        const isSelected = activeCategory === item;
                        return (
                            <button
                                key={item}
                                onClick={() => onCategoryChange && onCategoryChange(item)}
                                className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all tracking-wide whitespace-nowrap cursor-pointer ${
                                    isSelected
                                        ? "bg-green-50 text-green-700 border border-green-100/40"
                                        : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
                                }`}
                            >
                                {item === "Home" ? "🏠 Home" : item === "Deals" ? "🔥 Deals" : item}
                            </button>
                        );
                    })}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;