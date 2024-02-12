import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cart, removeFromCart } = useCart();
    
    return ( 
        <div className="container mx-auto px-4">
            <h2 
            className = "text-xl front-cold ay-4">Shopping Cart
            </h2>
            {cart.length === 0 ? (
                <p>
                    Your cart is empty.
                </p>
            ) : (
                <div>
                    {cart.map((item, index) => (  <div key={index} className="flex justify-between items-center my-4">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart; 