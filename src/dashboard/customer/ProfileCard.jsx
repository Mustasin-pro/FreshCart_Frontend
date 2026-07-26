import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ProfileCard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <div className="flex flex-col items-center text-center space-y-3">
        <img
          src={user?.photoURL || "https://placehold.co/150"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{user?.displayName || "FreshCart Customer"}</h2>
          <p className="text-xs text-gray-400 font-medium">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Account Type:</span>
          <span className="font-semibold text-emerald-600 uppercase text-xs tracking-wider">{user?.role || "Customer"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">User ID:</span>
          <span className="font-mono text-xs text-gray-600 truncate max-w-[180px]">{user?.dbId || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;