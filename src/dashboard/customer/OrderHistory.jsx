import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:7000/api/orders?customerEmail=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching customer orders:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <div className="text-center py-6 text-sm text-gray-500">Loading your orders...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">My Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-400">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;