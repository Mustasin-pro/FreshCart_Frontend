import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { CartContext } from "../provider/CartProvider";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Added quantity state

  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch(`https://freshcart-backend-j35s.onrender.com/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCartClick = () => {
    if (product) {
      addToCart(product, quantity); // Using selected quantity
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) return <div className="text-center p-10 text-white">Loading product details...</div>;
  if (!product) return <div className="text-center p-10 text-white">Product not found!</div>;

  // Check if discount is available
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
      {/* Product Image Section */}
      <div className="relative">
        <img 
          src={product.image || "https://placehold.co/600x400"} 
          alt={product.name} 
          className="w-full h-[350px] object-cover rounded-xl shadow-lg" 
        />
        {/* Flash Sale Badge */}
        {product.isFlashSale && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
            Flash Sale
          </span>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-950/50 px-3 py-1 rounded-md">
            {product.category}
          </span>
          
          <h1 className="text-4xl font-extrabold text-slate-100">{product.name}</h1>
          
          <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>
          
          {/* Vendor Information */}
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
            Seller: <span className="text-slate-200 font-medium">{product.vendorEmail}</span>
          </div>
        </div>

        {/* Pricing & Quantity Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-green-400">${product.discountPrice}</span>
                <span className="text-lg text-slate-500 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-green-400">${product.price}</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Quantity:</span>
            <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 hover:bg-slate-800 text-slate-300 transition"
              >
                -
              </button>
              <span className="px-4 font-semibold text-slate-100">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1.5 hover:bg-slate-800 text-slate-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Basket Button */}
          <button 
            onClick={handleAddToCartClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-green-900/30 active:scale-[0.99]"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;