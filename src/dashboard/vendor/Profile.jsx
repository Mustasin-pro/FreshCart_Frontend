import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Vendor Profile</h2>
      
      <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-gray-100">
        <img
          src={user?.photoURL || "https://placehold.co/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-sm"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{user?.displayName || "FreshCart Vendor"}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
            Role: {user?.role || "Vendor"}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Store Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-xs text-gray-400 font-medium">Store Name</p>
            <p className="text-sm font-semibold text-gray-800">{user?.displayName || "FreshCart Store"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-xs text-gray-400 font-medium">Business Email</p>
            <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-xs text-gray-400 font-medium">Database ID</p>
            <p className="text-xs font-mono text-gray-600 truncate">{user?.dbId || "N/A"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-xs text-gray-400 font-medium">Platform Status</p>
            <p className="text-sm font-semibold text-green-600">Active Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;