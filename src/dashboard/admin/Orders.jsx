import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetching all orders globally for admin view
    axios
      .get("https://freshcart-backend-j35s.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all orders for admin:", err);
        setLoading(false);
      });
  }, []);

  const handleGlobalStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://freshcart-backend-j35s.onrender.com/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(`Global order status updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-6 text-sm text-gray-400">Loading master orders...</div>;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Global Order Manifest</h2>
        <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
          Total Orders: {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No transactions recorded on the platform.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-700/50 text-xs font-bold text-gray-400 uppercase border-b border-slate-600">
                <th className="p-3">ID</th>
                <th className="p-3">Customer Email</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Delivery Status</th>
                <th className="p-3 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-700/20">
                  <td className="p-3 font-mono text-xs text-gray-400">#{order._id?.substring(18)}</td>
                  <td className="p-3 text-gray-300 font-medium">{order.customerEmail}</td>
                  <td className="p-3 font-semibold text-emerald-400">৳{order.totalAmount}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-950 text-green-400 border border-green-900"
                          : order.status === "Cancelled"
                          ? "bg-red-950 text-red-400 border border-red-900"
                          : "bg-amber-950 text-amber-400 border border-amber-900"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => handleGlobalStatusChange(order._id, e.target.value)}
                      className="text-xs bg-slate-900 border border-slate-700 text-gray-300 rounded p-1 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;