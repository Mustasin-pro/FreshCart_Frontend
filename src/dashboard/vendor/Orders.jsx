import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorOrders = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        // Sending vendorEmail to fetch filtered orders belonging to this vendor
        const response = await axios.get(
          `https://freshcart-backend-j35s.onrender.com/api/orders?vendorEmail=${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
        console.error("Error fetching vendor orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorOrders();
  }, [user?.email]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://freshcart-backend-j35s.onrender.com/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Update local state smoothly
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(`Order status updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update order status.");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-6 text-gray-500">Loading orders...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Order Management</h2>
        <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
          Total Received: {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No orders placed yet for your items.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm font-medium bg-gray-50">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items Ordered</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Delivery Status</th>
                <th className="p-3 text-right">Update Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono text-xs text-gray-500">#{order._id.substring(18)}</td>
                  <td className="p-3">
                    <p className="font-semibold text-gray-900">{order.customerName || "Guest"}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </td>
                  <td className="p-3">
                    {/* Render only items belonging to this specific vendor if nested, 
                        or mapping through general order items */}
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-xs text-gray-600">
                          • {item.name} <span className="text-gray-400">x{item.quantity}</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-medium text-gray-900">৳{order.totalAmount}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Paid (Stripe)
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="text-xs bg-white border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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