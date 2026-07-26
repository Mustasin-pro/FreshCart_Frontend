// src/dashboard/admin/Products.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, ShieldAlert } from "lucide-react";

const Products = () => {
    const [pendingProducts, setPendingProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7000/api/vendor-admin/pending")
            .then(res => setPendingProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleAction = async (id, actionStatus) => {
        try {
            const res = await axios.patch(`http://localhost:7000/api/vendor-admin/approve/${id}`, { status: actionStatus });
            if (res.data.success) {
                alert(`Product request ${actionStatus}!`);
                setPendingProducts(pendingProducts.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("Action execution failed");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 bg-slate-900 text-white min-h-screen rounded-xl">
            <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
                <ShieldAlert className="text-amber-500" size={28} />
                <div>
                    <h1 className="text-2xl font-bold text-white">Pending Vendor Submissions</h1>
                    <p className="text-xs text-gray-400 font-medium">Review and authorize incoming commercial grocery items</p>
                </div>
            </div>

            {pendingProducts.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-dashed border-gray-600 text-gray-400 font-medium">
                    No pending product insertion requests found.
                </div>
            ) : (
                <div className="bg-slate-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700 text-xs font-bold text-gray-300 uppercase border-b border-gray-600">
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Product Info</th>
                                <th className="px-6 py-3">Vendor Email</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
                            {pendingProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-700/50">
                                    <td className="px-6 py-4">
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-600" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{product.name}</div>
                                        <div className="text-xs text-gray-400 font-semibold">{product.category} &bull; <span className="text-green-400">৳{product.price}</span></div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono font-semibold text-gray-400">{product.vendorEmail}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleAction(product._id, "approved")}
                                                className="bg-green-900/50 hover:bg-green-600 text-green-400 hover:text-white p-2 rounded-lg transition cursor-pointer"
                                                title="Approve & Publish"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleAction(product._id, "rejected")}
                                                className="bg-red-900/50 hover:bg-red-600 text-red-400 hover:text-white p-2 rounded-lg transition cursor-pointer"
                                                title="Reject Request"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
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

export default Products;