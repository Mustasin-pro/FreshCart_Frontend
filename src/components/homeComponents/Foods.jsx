import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../provider/CartProvider"; // Safe path resolution to your custom context
import { Link } from "react-router";

const Foods = () => {
    const [foods, setfoods] = useState([]);
    const { addToCart } = useContext(CartContext); // Injecting core ecommerce cart handler

    useEffect(() => {
        // Fetching foods from backend API
        fetch("https://freshcart-backend-j35s.onrender.com/api/foods")
            .then(res => res.json())
            .then(data => setfoods(data))
            .catch(err => console.error("Error fetching foods:", err));
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    Fresh From Our <span className="text-green-600">Farms</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl font-medium">
                    Explore our wide selection of organic vegetables, fresh fruits, and premium groceries delivered straight to your doorstep.
                </p>
                <div className="w-20 h-1.5 bg-orange-500 mt-4 rounded-full mx-auto md:mx-0"></div>
            </div>

            {/* Foods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {foods.slice(0, 8).map(food => (
                    <div key={food._id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white group flex flex-col justify-between">
                        
                        {/* Image Container wrapped with Link to product details page */}
                        <Link to={`/product/${food._id}`} className="relative overflow-hidden block cursor-pointer">
                            <img 
                                src={food.image} 
                                alt={food.name} 
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Smart Badge: Renders automatically if product has an active discount */}
                            {food.discountPrice && (
                                <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm animate-pulse">
                                    Sale
                                </span>
                            )}
                        </Link>

                        {/* Text and Operations Details Info Box */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    {/* Title linked to product details page for better UX */}
                                    <Link to={`/product/${food._id}`} className="hover:text-green-600 transition-colors cursor-pointer">
                                        <h3 className="text-base font-bold text-gray-800 line-clamp-1">{food.name}</h3>
                                    </Link>
                                    <span className="bg-green-50 text-green-700 border border-green-100 text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                                        {food.category}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs mb-4 line-clamp-2 font-medium">
                                    {food.description}
                                </p>
                            </div>

                            {/* Price System Integration with Add To Cart execution point */}
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex flex-col">
                                    {food.discountPrice ? (
                                        <>
                                            <span className="text-xs text-gray-400 line-through font-bold">
                                                ৳{food.price}
                                            </span>
                                            <span className="text-xl font-black text-red-500 tracking-tight">
                                                ৳{food.discountPrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xl font-black text-gray-800 tracking-tight">
                                            ৳{food.price}
                                        </span>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={() => addToCart(food, 1)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer hover:shadow-green-200"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}  
            </div>

            {/* Load All Action Button Trigger Footer area */}
            <div className="flex my-8 justify-center">
                <Link to="/shop">
                    <button className="px-6 py-2.5 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95 cursor-pointer">
                        Load All Products
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Foods;