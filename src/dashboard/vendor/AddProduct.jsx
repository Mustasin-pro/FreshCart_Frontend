import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { PlusCircle, Loader2 } from "lucide-react";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [myRequests, setMyRequests] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        isFlashSale: false,
        saleEndDate: "",
        category: "Fruit & Vegetables",
        image: "",
        stock: "",       // Added state field
        unit: "kg"       // Added state field with default value
    });

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://freshcart-backend-j35s.onrender.com/api/vendor-admin/vendor/${user.email}`)
                .then(res => setMyRequests(res.data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
            isFlashSale: formData.isFlashSale,
            saleEndDate: formData.isFlashSale && formData.saleEndDate ? formData.saleEndDate : null,
            category: formData.category,
            image: formData.image,
            vendorEmail: user?.email,
            vendorName: user?.displayName || "FreshCart Seller",
            stock: parseInt(formData.stock) || 0, // Injected parameter parsing
            unit: formData.unit,                  // Injected unit details
            rating: 4.5                           // Standard baseline defaults
        };

        try {  
            const res = await axios.post("https://freshcart-backend-j35s.onrender.com/api/vendor-admin/request", productData);
            if (res.data.success) {
                alert(res.data.message);
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    discountPrice: "",
                    isFlashSale: false,
                    saleEndDate: "",
                    category: "Fruit & Vegetables",
                    image: "",
                    stock: "",
                    unit: "kg"
                });
                setMyRequests([...myRequests, { ...productData, status: "pending" }]);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 bg-slate-50 text-slate-900 rounded-xl">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <PlusCircle className="text-green-600" /> Request New Product Insertion
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Product Name</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" placeholder="e.g., Tomato" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white">
                            <option>Fruit & Vegetables</option>
                            <option>Breakfast & Dairy</option>
                            <option>Meat & Seafood</option>
                            <option>Beverages</option>
                            <option>Breads & Bakery</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description / Short Note</label>
                        <input type="text" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" placeholder="Fresh red tomatoes" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Regular Price (৳)</label>
                        <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Discount Price (৳)</label>
                        <input type="number" step="0.01" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" />
                    </div>
                    
                    {/* NEW: Stock Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Stock Quantity</label>
                        <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" placeholder="e.g., 150" />
                    </div>
                    {/* NEW: Unit Selection */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Measurement Unit</label>
                        <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white">
                            <option value="kg">kg (Kilogram)</option>
                            <option value="gm">gm (Gram)</option>
                            <option value="piece">piece</option>
                            <option value="pack">pack</option>
                            <option value="litre">litre</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
                        <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" />
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" id="flashSale" checked={formData.isFlashSale} onChange={e => setFormData({...formData, isFlashSale: e.target.checked})} className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                        <label htmlFor="flashSale" className="text-sm font-semibold text-gray-700 cursor-pointer">Include in Flash Sale?</label>
                    </div>
                    <div>
                        {formData.isFlashSale && (
                            <>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Sale End Date</label>
                                <input type="datetime-local" required value={formData.saleEndDate} onChange={e => setFormData({...formData, saleEndDate: e.target.value})} className="w-full px-3 py-2 border rounded-md focus:outline-green-600 bg-white" />
                            </>
                        )}
                    </div>
                    <button type="submit" disabled={loading} className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Production Request"}
                    </button>
                </form>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <h3 className="font-bold text-gray-700">My Product Submissions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price / Unit</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm text-gray-700">
                            {myRequests.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-semibold">{item.name}</td>
                                    <td className="px-6 py-3 text-gray-500">{item.category}</td>
                                    <td className="px-6 py-3 font-medium">
                                        {item.discountPrice ? (
                                            <span>
                                                <span className="line-through text-gray-400 mr-1.5">৳{item.price}</span>
                                                <span className="text-green-600">৳{item.discountPrice}</span>
                                            </span>
                                        ) : (
                                            <span>৳{item.price}</span>
                                        )}
                                        <span className="text-gray-400 text-xs font-normal"> /{item.unit || "kg"}</span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-600 font-semibold">{item.stock ?? 0}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {item.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;