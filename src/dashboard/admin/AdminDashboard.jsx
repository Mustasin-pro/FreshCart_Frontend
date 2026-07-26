import { useState } from "react";
import Products from "./Products"; // Loads the fixed AdminApproval logic
import Orders from "./Orders";
import Users from "./Users";

const AdminDashboard = () => {
  const [activeAdminTab, setActiveAdminTab] = useState("control-room");

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      
      {/* Sidebar Layout */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-5 border-b border-slate-800">
          <h1 className="text-lg font-bold text-white tracking-wide">FreshCart Admin</h1>
          <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider">Root Control</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveAdminTab("control-room")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeAdminTab === "control-room" ? "bg-slate-800 text-amber-400 border-l-2 border-amber-500" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            System Operations
          </button>
          <button
            onClick={() => setActiveAdminTab("submissions")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeAdminTab === "submissions" ? "bg-slate-800 text-amber-400 border-l-2 border-amber-500" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            Vendor Requests
          </button>
          <button
            onClick={() => setActiveAdminTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeAdminTab === "orders" ? "bg-slate-800 text-amber-400 border-l-2 border-amber-500" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            Global Orders
          </button>
          <button
            onClick={() => setActiveAdminTab("users")}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeAdminTab === "users" ? "bg-slate-800 text-amber-400 border-l-2 border-amber-500" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            Manage Accounts
          </button>
        </nav>
      </div>

      {/* Main Screen Layout Container */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeAdminTab === "control-room" && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              <h2 className="text-xl font-bold text-white">Central Operations Management</h2>
              <p className="text-slate-400 text-xs mt-1">Global administrative access for marketplace moderation, logistics validation, and access control.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div onClick={() => setActiveAdminTab("submissions")} className="bg-slate-900 p-5 rounded-xl border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all">
                <p className="text-xs font-bold text-gray-500 uppercase">Approvals</p>
                <p className="text-base font-bold text-white mt-1">Review Vendor Submissions</p>
              </div>
              <div onClick={() => setActiveAdminTab("orders")} className="bg-slate-900 p-5 rounded-xl border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all">
                <p className="text-xs font-bold text-gray-500 uppercase">Logistics</p>
                <p className="text-base font-bold text-white mt-1">Track System Deliveries</p>
              </div>
              <div onClick={() => setActiveAdminTab("users")} className="bg-slate-900 p-5 rounded-xl border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all">
                <p className="text-xs font-bold text-gray-500 uppercase">Security</p>
                <p className="text-base font-bold text-white mt-1">Manage Privilege Tiers</p>
              </div>
            </div>
          </div>
        )}

        {/* Evaluation components map */}
        {activeAdminTab === "submissions" && <Products />}
        {activeAdminTab === "orders" && <Orders />}
        {activeAdminTab === "users" && <Users />}
      </div>

    </div>
  );
};

export default AdminDashboard;