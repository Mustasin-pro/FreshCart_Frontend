import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import VendorDashboard from "./vendor/VendorDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  // Loading state handling
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Loading system dashboard...
      </div>
    );
  }

  // Security Guard: If no user session found
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center max-w-sm">
          <h2 className="text-lg font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-500 text-sm mt-1 mb-4">Please log in to your account to view the dashboard workspace.</p>
          <a 
            href="/auth/login" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2 rounded transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Simple clean switch case using standard context user role properties
  switch (user.role?.toLowerCase()) {
    case "admin":
      return <AdminDashboard />;
    case "vendor":
      return <VendorDashboard />;
    case "customer":
    default:
      return <CustomerDashboard />;
  }
};

export default Dashboard;