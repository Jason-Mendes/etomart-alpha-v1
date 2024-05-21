import React, { useState } from 'react';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleCartClick = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="relative cursor-pointer " onClick={handleCartClick}>
  <button
      className="w-24 h-8 rounded-xl border-none bg-[#ffaf5e4b] flex items-center justify-center cursor-pointer transition duration-500 overflow-hidden relative active:scale-95 hover:bg-[#ffaf5e9c]"
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('.icon-container').style.transform = 'translateX(58px)';
        e.currentTarget.querySelector('.icon-container').style.borderRadius = '40px';
        e.currentTarget.querySelector('.text').style.transform = 'translate(10px, 0)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector('.icon-container').style.transform = 'translateX(0)';
        e.currentTarget.querySelector('.icon-container').style.borderRadius = '50%';
        e.currentTarget.querySelector('.text').style.transform = 'translate(0, 0)';
      }}
    >
      <span
        className="icon-container absolute left-[-50px] w-8 h-8 bg-transparent rounded-full flex items-center justify-center overflow-hidden z-2 transition duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 576 512"
          fill="#ee9613"
          className="cart"
        >
          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
        </svg>
      </span>
      <p className="text h-full flex items-center justify-center text-[#ee9613] z-1 transition duration-500 text-lg font-bold">
       Cart
      </p>
    </button>
    </div>
  );
};

export default CartIcon;











// import React from 'react';
// import { useCart } from '../context/CartContext';

// function Cart() {
//     const { cart, removeFromCart } = useCart();
    
//     return ( 
//         <div className="container mx-auto px-4">
//             <h2 
//             className = "text-xl front-cold ay-4">Shopping Cart
//             </h2>
//             {cart.length === 0 ? (
//                 <p>
//                     Your cart is empty.
//                 </p>
//             ) : (
//                 <div>
//                     {cart.map((item, index) => (  <div key={index} className="flex justify-between items-center my-4">
//                             <div>
//                                 <p className="font-semibold">{item.name}</p>
//                                 <p>Qty: {item.quantity}</p>
//                             </div>
//                             <button
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="bg-red-500 text-white px-4 py-2 rounded">
//                                 Remove
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cart; 