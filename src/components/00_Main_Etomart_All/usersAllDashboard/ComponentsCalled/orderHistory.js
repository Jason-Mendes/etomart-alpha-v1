import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Replace this with actual API call
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: '1', date: '2023-09-01', total: 45.99, status: 'Delivered', items: [{ name: 'Product A', quantity: 2, price: 22.99 }] },
            { id: '2', date: '2023-08-15', total: 32.50, status: 'Processing', items: [{ name: 'Product B', quantity: 1, price: 32.50 }] },
            { id: '3', date: '2023-07-30', total: 78.25, status: 'Delivered', items: [{ name: 'Product C', quantity: 3, price: 26.08 }] },
            { id: '4', date: '2023-06-22', total: 55.00, status: 'Cancelled', items: [{ name: 'Product D', quantity: 1, price: 55.00 }] },
            { id: '5', date: '2023-05-18', total: 120.75, status: 'Delivered', items: [{ name: 'Product E', quantity: 5, price: 24.15 }] },
            { id: '6', date: '2023-04-05', total: 89.99, status: 'Delivered', items: [{ name: 'Product F', quantity: 2, price: 44.99 }] },
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

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex items-center">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by order ID or status"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading order history...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
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
                {currentOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    className="border-b last:border-b-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-orange-600 text-sm font-medium hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-orange-600 hover:bg-orange-100'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastOrder >= filteredOrders.length}
              className={`p-2 rounded-full ${indexOfLastOrder >= filteredOrders.length ? 'text-gray-400 cursor-not-allowed' : 'text-orange-600 hover:bg-orange-100'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button onClick={handleCloseDetails} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
              <ul>
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>{item.name}</strong> x{item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderHistory;