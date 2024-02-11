import React, { Children, createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  // State for the cart items and a function to add an item.
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
    // Add logic to handle adding items to the cart
    // This is a simplified example: you'll need to handle duplicates and quantity updates
        setCart([...cart, { ...product, quantity }]);
    };

    const removeFromCart = (productId) => {
        //Remove item logic
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        //Clear cart logic
        setCart ([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
        );
};