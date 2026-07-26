import { Menu, X, ShoppingCart, UserRound, Search, LogOut, LayoutDashboard, Handbag, BadgePercent, Flame } from "lucide-react"; 
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; 
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../provider/CartProvider"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    const { user, logOut } = useContext(AuthContext); 
    const { cart } = useContext(CartContext); 
    const navigate = useNavigate(); 

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                setDropdownOpen(false);
                setIsOpen(false);
            })
            .catch(err => console.error(err));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedSearch = searchTerm.trim();
        if (trimmedSearch) {
            navigate(`/search?query=${trimmedSearch}`);
            setIsOpen(false); 
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80">
            
            
            {/* Desktop Navbar Core */}
            <div className="flex justify-between items-center px-6 md:px-12 py-3.5 max-w-[1400px] mx-auto">
                
                {/* Logo - Fully Green Minimalist Stylization */}
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <div className="bg-green-600 p-1.5 rounded-xl text-white shadow-sm shadow-green-600/20">
                        <Handbag size={20} />
                    </div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight transition">
                        Fresh<span className="text-green-600">Cart</span>
                    </h1>
                </Link>



                {/* Desktop Search Bar - Compact Sleek Design */}
                <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-6">
                    <div className="flex w-full items-center relative">
                        <input 
                            type="text" 
                            placeholder="Search for fresh products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-200 focus:border-green-500 pl-4 pr-10 py-2 w-full focus:outline-none rounded-xl text-sm text-gray-700 transition-all bg-gray-50 placeholder-gray-400 font-medium"
                        />
                        <button type="submit" className="absolute right-3 text-gray-400 hover:text-green-600 transition-colors cursor-pointer">
                            <Search size={16} />
                        </button>
                    </div>
                </form>

                {/* Desktop Menu Operations */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/shop" className="flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-green-600 transition-colors">
                        <ShoppingCart size={18} className="text-gray-500 group-hover:text-green-600" />
                        <span>Shop</span>
                    </Link>

                    {/* Cart Link with Modern Pill Counter Badge */}
                    <Link to="/cart" className="relative flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="relative">
                            <Handbag size={18} className="text-gray-500" />
                            <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                                {cart?.length || 0} 
                            </span>
                        </div>
                        <span className="ml-1">Cart</span>
                    </Link>

                    {/* Authentication Status Wrapper */}
                    {user ? (
                        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-4">
                            <div className="flex flex-col text-right">
                                <span className="text-xs font-bold text-gray-800">{user.displayName || "User"}</span>
                                <span className="text-[10px] font-medium text-gray-400 capitalize">{user.role || "Customer"}</span>
                            </div>
                            
                            <button 
                                onClick={toggleDropdown}
                                className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-gray-50 cursor-pointer focus:outline-none transition transform active:scale-95"
                            >
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserRound className="w-full h-full p-2 text-green-600" />
                                )}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 font-semibold transition"><LayoutDashboard size={15} /> Dashboard</Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button onClick={handleLogOut} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold text-left cursor-pointer transition"><LogOut size={15} /> Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth/login" className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-green-600/10">
                            <UserRound size={14} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Icons Menu */}
                <div className="flex md:hidden items-center gap-4">
                    <Link to="/cart" className="relative p-1 text-gray-700">
                        <Handbag size={22} />
                        <span className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                            {cart?.length || 0}
                        </span>
                    </Link>
                    <button onClick={toggleMenu} className="text-gray-700 cursor-pointer p-1">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;