import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:7000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching platform users:", err);
        setLoading(false);
      });
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:7000/api/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(
        users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      alert(`User privileges updated to ${newRole}`);
    } catch (err) {
      alert("Failed to alter user authorization role.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-6 text-sm text-gray-400">Loading user registry...</div>;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Platform User Registry</h2>
        <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
          Total Members: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-700/50 text-xs font-bold text-gray-400 uppercase border-b border-slate-600">
              <th className="p-3">User Profile</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Current Authorization</th>
              <th className="p-3 text-right">Modify Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {users.map((account) => (
              <tr key={account._id} className="hover:bg-slate-700/20">
                <td className="p-3 font-semibold text-white">{account.username || "Anonymous"}</td>
                <td className="p-3 font-mono text-xs text-gray-400">{account.email}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${
                      account.role === "admin"
                        ? "bg-purple-950 text-purple-400 border border-purple-900"
                        : account.role === "vendor"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                        : "bg-slate-900 text-gray-400 border border-slate-700"
                    }`}
                  >
                    {account.role || "customer"}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <select
                    value={account.role || "customer"}
                    onChange={(e) => handleRoleChange(account._id, e.target.value)}
                    className="text-xs bg-slate-900 border border-slate-700 text-gray-300 rounded p-1 focus:outline-none"
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;