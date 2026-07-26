const OrderCard = ({ order }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-50">
        <div>
          <p className="text-xs font-mono text-gray-400">#{order._id?.substring(18)}</p>
          <p className="text-xs text-gray-500 mt-0.5">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            order.status === "Delivered"
              ? "bg-green-50 text-green-700"
              : order.status === "Cancelled"
              ? "bg-red-50 text-red-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {order.status || "Pending"}
        </span>
      </div>

      <div className="space-y-2">
        {order.items?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-700">
            <span>
              {item.name} <span className="text-gray-400 text-xs">x{item.quantity}</span>
            </span>
            <span className="font-medium">৳{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-sm">
        <span className="text-gray-500 font-medium">Total Paid:</span>
        <span className="text-base font-bold text-emerald-600">৳{order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderCard;