import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountdownTimer from "./CountdownTimer";

const FlashSaleSection = () => {
  const [flashProducts, setFlashProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/foods')
      .then(res => {
        const activeDeals = res.data.filter(product => 
          product.isFlashSale && new Date(product.saleEndDate) > new Date()
        );
        // Displaying up to 5 items to match the image structure
        setFlashProducts(activeDeals.slice(0, 5));
      })
      .catch(err => console.error("Error fetching flash sale:", err));
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <div className="my-12 bg-white border border-red-500 p-6 rounded-md">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-normal text-blue-900">
            Special Offers <span className="text-red-500 font-semibold underline decoration-red-500">of the week!</span>
          </h2>
          <p className="text-gray-400 text-sm hidden md:block">Ut placerat, magna quis porttitor vulputate, magna nunc auctor ante.</p>
        </div>
        
        {/* Countdown Timer */}
        <div>
          <CountdownTimer targetDate={flashProducts[0]?.saleEndDate} />
        </div>
      </div>

      {/* Product Grid (5 Columns on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-y border-gray-100">
        {flashProducts.map((product) => {
          const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);
          
          return (
            <div key={product._id} className="bg-white border-r border-b border-gray-100 p-4 relative flex flex-col justify-between group">
              
              <div>
                {/* Discount Badge */}
                <span className="absolute top-4 left-4 bg-cyan-400 text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
                  {discountPercent}%
                </span>
                
                {/* Optional Tag like ORGANIC / RECOMMENDED if present in data */}
                {product.badge && (
                  <span className="absolute top-12 left-4 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {product.badge}
                  </span>
                )}
                
                {/* Product Image Area */}
                <div className="h-44 w-full flex items-center justify-center mb-6">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info Area */}
                <div className="text-center sm:text-left mt-2">
                  {/* Pricing Area */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="text-base font-bold text-red-500">${product.discountPrice.toFixed(2)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px] hover:text-red-500 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashSaleSection;