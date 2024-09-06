import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const RedeemCode = () => {
  const [code, setCode] = useState('');
  const [redeemHistory, setRedeemHistory] = useState([]);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemResult, setRedeemResult] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    // Calculate total credits from redemption history
    const total = redeemHistory.reduce((sum, item) => sum + item.reward, 0);
    setTotalCredits(total);
  }, [redeemHistory]);

  const handleRedeem = (e) => {
    e.preventDefault();
    setIsRedeeming(true);
    setRedeemResult(null);

    // Simulating code redemption process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      if (success) {
        const reward = Math.floor(Math.random() * 100) + 1; // Random reward between 1 and 100 credits
        const newRedemption = { code, reward, date: new Date().toISOString() };
        setRedeemHistory(prevHistory => [newRedemption, ...prevHistory]);
        setRedeemResult({ success: true, message: `Congratulations! You've redeemed ${reward} credits.` });
      } else {
        setRedeemResult({ success: false, message: 'Invalid or expired code. Please try again.' });
      }
      setIsRedeeming(false);
      setCode('');
    }, 1500);
  };

  const handleDeleteHistory = (index) => {
    setRedeemHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Gift className="mr-2 text-orange-600" /> Redeem Code
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleRedeem} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <motion.button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRedeeming}
            >
              {isRedeeming ? (
                <motion.div
                  className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Gift className="mr-2" size={18} />
              )}
              {isRedeeming ? 'Redeeming...' : 'Redeem'}
            </motion.button>
          </div>
        </form>
        <AnimatePresence>
          {redeemResult && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-md mb-6 ${
                redeemResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {redeemResult.success ? (
                <CheckCircle className="inline-block mr-2" size={18} />
              ) : (
                <XCircle className="inline-block mr-2" size={18} />
              )}
              {redeemResult.message}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 text-orange-600" /> Redemption History
          </h2>
          <p className="text-lg font-medium mb-4">Total Credits Earned: {totalCredits}</p>
          {redeemHistory.length === 0 ? (
            <p className="text-gray-600">No redemptions yet.</p>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence>
                {redeemHistory.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="border-b pb-4 last:border-b-0 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">Code: {item.code}</p>
                      <p className="text-orange-600 font-semibold">Reward: {item.reward} credits</p>
                      <p className="text-gray-600 text-sm">
                        Date: {new Date(item.date).toLocaleString()}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleDeleteHistory(index)}
                      className="text-red-600 hover:text-red-800"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedeemCode;