import { useState } from "react";
import MyProducts from "./MyProducts";
import AddProduct from "./AddProduct";
import Orders from "./Orders";
import Profile from "./Profile";

const VendorDashboard = () => {
  // Simple state to track active navigation menu
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-5 border-b border-slate-700">
          <h1 className="text-xl font-bold text-emerald-400 tracking-wide">Vendor Panel</h1>
          <p className="text-xs text-slate-400">FreshCart Merchant</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "dashboard" ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Dashboard Home
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "products" ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab("add-product")}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "add-product" ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "orders" ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "profile" ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            My Profile
          </button>
        </nav>
      </div>

      {/* Main Content Render View */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back, Vendor!</h2>
              <p className="text-gray-500 text-sm mt-1">Here is a quick glance at your shop performance today.</p>
            </div>
            
            {/* Minimal Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div onClick={() => setActiveTab("products")} className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-emerald-500 border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-gray-400 uppercase">My Items</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">Manage Store</p>
              </div>
              <div onClick={() => setActiveTab("orders")} className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-blue-500 border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-gray-400 uppercase">New Orders</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">Check Details</p>
              </div>
              <div onClick={() => setActiveTab("add-product")} className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-amber-500 border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-gray-400 uppercase">Stock Supply</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">+ Add Product</p>
              </div>
            </div>
          </div>
        )}

        {/* Conditional rendering depending on simple text tabs state */}
        {activeTab === "products" && <MyProducts />}
        {activeTab === "add-product" && <AddProduct />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "profile" && <Profile />}
      </div>

    </div>
  );
};

export default VendorDashboard;