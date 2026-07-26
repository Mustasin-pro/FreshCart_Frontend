import { Store, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-slate-100 pt-16 pb-8 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Brand Section */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Store size={28} className="text-green-600" />
                        <h1 className="text-2xl font-black text-green-600 tracking-tight">
                            Fresh<span className="text-orange-500">Cart</span>
                        </h1>
                    </Link>
                    <p className="text-slate-600 leading-relaxed font-medium">
                        Your trusted marketplace for fresh groceries and daily essentials. Supporting local vendors worldwide.
                    </p>
                    <div className="flex gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:text-green-600 transition-colors text-slate-600 border border-slate-200">
                            <Facebook size={20} />
                        </div>
                        <div className="p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:text-green-600 transition-colors text-slate-600 border border-slate-200">
                            <Twitter size={20} />
                        </div>
                        <div className="p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:text-green-600 transition-colors text-slate-600 border border-slate-200">
                            <Instagram size={20} />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-slate-800 font-bold text-lg mb-6">Quick Links</h3>
                    <ul className="space-y-3">
                        {['About Us', 'Shop Products', 'Vendor Register', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link to="#" className="text-slate-600 hover:text-green-600 font-medium transition-colors flex items-center gap-2 group">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full group-hover:bg-green-600 transition-colors"></div>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-slate-800 font-bold text-lg mb-6">Contact Us</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-slate-600 font-medium">
                            <MapPin size={20} className="text-green-600 mt-1 shrink-0" />
                            <span>123 Market Street, <br />Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600 font-medium">
                            <Phone size={20} className="text-green-600 shrink-0" />
                            <span>+880 1234 567890</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600 font-medium">
                            <Mail size={20} className="text-green-600 shrink-0" />
                            <span>support@freshcart.com</span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-slate-800 font-bold text-lg mb-6">Newsletter</h3>
                    <p className="text-slate-600 mb-4 font-medium text-sm">Subscribe to get updates on new products and offers.</p>
                    <form className="relative group">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-slate-800 font-medium"
                        />
                        <button 
                            type="submit" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 p-2 rounded-lg text-black hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-semibold">
                        © 2026 FreshCart. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm font-bold text-slate-600">
                        <Link to="#" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-green-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;