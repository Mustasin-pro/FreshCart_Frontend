import { useState } from "react";
import ProfileCard from "./ProfileCard";
import OrderHistory from "./OrderHistory";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-lg font-bold text-emerald-600">Customer Panel</h1>
          <p className="text-xs text-gray-400">FreshCart Shopper</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "dashboard" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Dashboard Home
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "orders" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Orders
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "profile" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            My Profile
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Hello, Welcome to your Dashboard!</h2>
              <p className="text-gray-500 text-xs mt-1">Track your online grocery orders and manage your shop profile details easily.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div onClick={() => setActiveTab("orders")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition-all">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Purchases</p>
                <p className="text-lg font-bold text-gray-800 mt-1">View Order History</p>
              </div>
              <div onClick={() => setActiveTab("profile")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition-all">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Settings</p>
                <p className="text-lg font-bold text-gray-800 mt-1">Check Profile Details</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && <OrderHistory />}
        {activeTab === "profile" && <ProfileCard />}
      </div>
    </div>
  );
};

export default CustomerDashboard;