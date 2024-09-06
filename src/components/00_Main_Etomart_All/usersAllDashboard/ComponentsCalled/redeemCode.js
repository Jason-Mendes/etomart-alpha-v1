import React, { useState } from 'react';

const RedeemCode = () => {
  const [code, setCode] = useState('');
  const [redeemHistory, setRedeemHistory] = useState([]);

  const handleRedeem = (e) => {
    e.preventDefault();
    // Simulating code redemption process
    const redeemResult = Math.random() > 0.3; // 70% success rate
    if (redeemResult) {
      const reward = Math.floor(Math.random() * 100) + 1; // Random reward between 1 and 100 credits
      setRedeemHistory(prevHistory => [
        { code, reward, date: new Date().toLocaleString() },
        ...prevHistory
      ]);
      alert(`Congratulations! You've redeemed ${reward} credits.`);
    } else {
      alert('Invalid or expired code. Please try again.');
    }
    setCode('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Redeem Code</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleRedeem} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="flex-grow px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
            >
              Redeem
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Redemption History</h2>
          {redeemHistory.length === 0 ? (
            <p className="text-gray-600">No redemptions yet.</p>
          ) : (
            <ul className="space-y-4">
              {redeemHistory.map((item, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0">
                  <p className="font-medium">Code: {item.code}</p>
                  <p className="text-gray-600">Reward: {item.reward} credits</p>
                  <p className="text-gray-600 text-sm">Date: {item.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedeemCode;