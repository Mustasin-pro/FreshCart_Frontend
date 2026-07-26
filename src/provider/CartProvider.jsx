import { createContext, useState, useEffect } from "react";

// Create Cart Context to share data across the app
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Load initial cart data from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync Cart state with LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handler to add, update, or remove items from the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item._id === product._id);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[existingItemIndex].quantity + quantity;

        // If quantity is 0 or less, remove item from cart
        if (newQuantity <= 0) {
          return updatedCart.filter((item) => item._id !== product._id);
        }

        // Update quantity of existing product
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: newQuantity,
        };
        return updatedCart;
      }

      // Add completely new product to cart
      if (quantity > 0) {
        return [...prevCart, { ...product, quantity }];
      }

      return prevCart;
    });
  };

  // Clear all items from cart (useful after checkout)
  const clearCart = () => setCart([]);

  const cartInfo = {
    cart,
    addToCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>
      {children}
    </CartContext.Provider>
  );
};