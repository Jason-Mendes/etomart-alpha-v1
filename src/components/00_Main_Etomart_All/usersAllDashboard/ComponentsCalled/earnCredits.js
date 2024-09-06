import React, { useState } from 'react';

const EarnCredits = () => {
  const [credits, setCredits] = useState(0);
  const [referralCode, setReferralCode] = useState('');

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    // Simulating credit earning process
    const earnedCredits = Math.floor(Math.random() * 50) + 10; // Random credits between 10 and 59
    setCredits(prevCredits => prevCredits + earnedCredits);
    setReferralCode('');
    alert(`Congratulations! You earned ${earnedCredits} credits.`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Earn Etomart Credits</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Credits: {credits}</h2>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Refer a Friend</h3>
          <p className="text-sm text-gray-600 mb-4">Earn credits by referring friends to Etomart!</p>
          <form onSubmit={handleReferralSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter friend's referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
            >
              Submit Referral
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Daily Login Bonus</h3>
          <p className="text-sm text-gray-600 mb-4">Log in daily to earn bonus credits!</p>
          <button
            onClick={() => alert('Come back tomorrow for your next daily bonus!')}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Claim Daily Bonus
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Complete Surveys</h3>
          <p className="text-sm text-gray-600 mb-4">Earn credits by completing short surveys.</p>
          <button
            onClick={() => alert('No surveys available at the moment. Check back later!')}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            View Available Surveys
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarnCredits;