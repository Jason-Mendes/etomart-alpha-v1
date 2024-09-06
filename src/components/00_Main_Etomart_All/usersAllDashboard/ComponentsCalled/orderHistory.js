import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch order history
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Replace this with actual API call
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: '1', date: '2023-09-01', total: 45.99, status: 'Delivered' },
            { id: '2', date: '2023-08-15', total: 32.50, status: 'Processing' },
            { id: '3', date: '2023-07-30', total: 78.25, status: 'Delivered' },
          ]), 1000)
        );
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    // Implement logic to view order details
    console.log(`View details for order ${orderId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;