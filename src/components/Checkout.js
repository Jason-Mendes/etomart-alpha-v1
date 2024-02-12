import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { processPayment, createOrder } from './paymentService'; // Import your payment and order services

function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default selection
    const [shippingInfo, setShippingInfo] = useState({
        name: '', address: '', city: '', country: ''
    });
    const history = useHistory(); // Enables navigation post-checkout

    // Handle form field changes
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setShippingInfo(prevState => ({ ...prevState, [name]: value }));
    };

    // Update payment method selection
    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Form submission logic
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (paymentMethod === 'PayGate') {
            // Integrate PayGate payment processing
            const paymentResult = await processPayment(shippingInfo);
            if (paymentResult.success) {
                history.push('/order-success'); // Navigate to success page
            } else {
                // Handle payment failure
                console.error('Payment failed:', paymentResult.message);
            }
        } else {
            // COD order processing
            await createOrder({ ...shippingInfo, paymentMethod });
            history.push('/order-success'); // Navigate to success page
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Shipping Information Section */}
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleFormChange} required />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="address" onChange={handleFormChange} required />
            </div>
            {/* Additional form fields */}

            {/* Payment Method Selection */}
            <div>
                <input
                    type="radio"
                    value="PayGate"
                    checked={paymentMethod === 'PayGate'}
                    onChange={handlePaymentChange}
                /> PayGate
                <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={handlePaymentChange}
                /> Cash on Delivery
            </div>

            <button type="submit">Place Order</button>
        </form>
    );
}

export default Checkout;










// import React, { useState } from 'react';
// // Import PayGate SDK or necessary utilities for payment processing

// function Checkout() {
//     const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD
//     const [shippingInfo, setShippingInfo] = useState({ name: '', address: '' });

//     const handlePaymentMethodChange = (event) => {
//         setPaymentMethod(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Handle form submission
//         // If PayGate is selected, initiate payment processing through the gateway
//         // For COD, proceed to create an order with payment due on delivery

//         if (paymentMethod === 'PayGate') {
//             // Process payment through PayGate
//             // Replace this with actual payment processing logic
//         } else {
//             // Handle COD order creation
//             // Add logic to create order in Firestore
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Shipping Information Inputs */}
//             <div>
//                 <label>Name:</label>
//                 <input type="text" name="name" required />
//             </div>
//             <div>
//                 <label>Address:</label>
//                 <input type="text" name="address" required />
//             </div>
            
//             {/* Payment Method Selection */}
//             <div>
//                 <label>
//                     <input
//                         type="radio"
//                         value="PayGate"
//                         checked={paymentMethod === 'PayGate'}
//                         onChange={handlePaymentMethodChange}
//                     />
//                     PayGate
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         value="COD"
//                         checked={paymentMethod === 'COD'}
//                         onChange={handlePaymentMethodChange}
//                     />
//                     Cash on Delivery
//                 </label>
//             </div>
            
//             <button type="submit">Place Order</button>
//         </form>
//     );
// }

// export default Checkout;



// // import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom'; // Import useHistory for redirection after checkout

// // function Checkout({ cart, clearCart }) {
// //     const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', country: '' });
// //     const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD
// //     const history = useHistory(); // For redirecting after successful checkout

// //     const handleFormChange = (event) => {
// //         const { name, value } = event.target;
// //         setShippingInfo(prevState => ({ ...prevState, [name]: value }));
// //     };

// //     const handlePaymentChange = (event) => {
// //         setPaymentMethod(event.target.value);
// //     };

// //     const processCODOrder = async () => {
// //         // Here, you would typically save the order details to your database
// //         // with a status indicating it's a COD order.
// //         // This is a placeholder; replace with actual implementation.

// //         clearCart(); // Clear the cart after saving the order
// //         history.push('/order-success'); // Redirect to a success page
// //     };

// //     const processPayGatePayment = async () => {
// //         // This function should handle the integration with PayGate.
// //         // Since the specifics depend on PayGate's API, include those steps here.
// //         // For example, you might open a payment modal, redirect to a payment page, etc.

// //         // Placeholder for PayGate payment processing logic

// //         // After successful payment:
// //         clearCart(); // Clear the cart
// //         history.push('/order-success'); // Redirect to a success page
// //     };

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();
// //         if (paymentMethod === 'PayGate') {
// //             await processPayGatePayment();
// //         } else {
// //             await processCODOrder();
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit}>
// //             {/* Shipping Information Form Fields */}
// //             <div>
// //                 <label>Name:</label>
// //                 <input type="text" name="name" value={shippingInfo.name} onChange={handleFormChange} required />
// //             </div>
// //             <div>
// //                 <label>Address:</label>
// //                 <input type="text" name="address" value={shippingInfo.address} onChange={handleFormChange} required />
// //             </div>
// //             <div>
// //                 <label>City:</label>
// //                 <input type="text" name="city" value={shippingInfo.city} onChange={handleFormChange} required />
// //             </div>
// //             <div>
// //                 <label>Country:</label>
// //                 <input type="text" name="country" value={shippingInfo.country} onChange={handleFormChange} required />
// //             </div>

// //             {/* Payment Method Selection */}
// //             <div>
// //                 <label>
// //                     <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={handlePaymentChange} />
// //                     Cash on Delivery
// //                 </label>
// //                 <label>
// //                     <input type="radio" value="PayGate" checked={paymentMethod === 'PayGate'} onChange={handlePaymentChange} />
// //                     PayGate
// //                 </label>
// //             </div>

// //             {/* Order Review and Submit Button */}
// //             <button type="submit">Place Order</button>
// //         </form>
// //     );
// // }

// // export default Checkout;





// // // import React, { useState } from 'react';
// // // // Import other necessary components and services

// // // function Checkout({ cart, clearCart }) {
// // //     const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', country: '' });
// // //     const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD

// // //     const handleFormChange = (event) => {
// // //         const { name, value } = event.target;
// // //         setShippingInfo(prevState => ({ ...prevState, [name]: value }));
// // //     };

// // //     const handlePaymentChange = (event) => {
// // //         setPaymentMethod(event.target.value);
// // //     };

// // //     const handleSubmit = async (event) => {
// // //         event.preventDefault();
// // //         if (paymentMethod === 'PayGate') {
// // //             // Implement PayGate payment processing
// // //         } else {
// // //             // Handle COD order
// // //             // You might want to save the order to your database with a status indicating it's COD
// // //             // and to be paid upon delivery
// // //         }
// // //         // Clear the cart after successful submission
// // //         clearCart();
// // //         // Redirect user to a success page or show a success message
// // //     };

// // //     return (
// // //         <form onSubmit={handleSubmit}>
// // //             {/* Shipping Information Form Fields */}
// // //             {/* Payment Method Selection */}
// // //             <div>
// // //                 <label>
// // //                     <input
// // //                         type="radio"
// // //                         value="COD"
// // //                         checked={paymentMethod === 'COD'}
// // //                         onChange={handlePaymentChange}
// // //                     />
// // //                     Cash on Delivery
// // //                 </label>
// // //                 <label>
// // //                     <input
// // //                         type="radio"
// // //                         value="PayGate"
// // //                         checked={paymentMethod === 'PayGate'}
// // //                         onChange={handlePaymentChange}
// // //                     />
// // //                     PayGate
// // //                 </label>
// // //             </div>
// // //             {/* Order Review and Submit Button */}
// // //             <button type="submit">Place Order</button>
// // //         </form>
// // //     );
// // // }

// // // export default Checkout;
