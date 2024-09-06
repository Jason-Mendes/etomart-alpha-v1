import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, FileText, TrendingUp, Clock, Check } from 'lucide-react';

const EarnCredits = () => {
  const [credits, setCredits] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [creditHistory, setCreditHistory] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [surveyProgress, setSurveyProgress] = useState(0);

  useEffect(() => {
    // Simulate checking last login date
    const storedDate = localStorage.getItem('lastLoginDate');
    if (storedDate) {
      setLastLoginDate(new Date(storedDate));
      const streak = parseInt(localStorage.getItem('dailyStreak') || '0');
      setDailyStreak(streak);
    }
    // Set today as the last login date
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastLoginDate', today);
  }, []);

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    const earnedCredits = Math.floor(Math.random() * 50) + 10;
    addCredits(earnedCredits, 'Referral');
    setReferralCode('');
  };

  const handleDailyBonus = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!lastLoginDate || lastLoginDate.toISOString().split('T')[0] !== today) {
      const newStreak = dailyStreak + 1;
      const bonusCredits = Math.min(10 + newStreak, 50); // Max 50 credits per day
      addCredits(bonusCredits, 'Daily Bonus');
      setDailyStreak(newStreak);
      localStorage.setItem('dailyStreak', newStreak.toString());
      setLastLoginDate(new Date());
    } else {
      alert('Come back tomorrow for your next daily bonus!')}
  };

  const handleSurveyComplete = () => {
    const earnedCredits = Math.floor(Math.random() * 30) + 20;
    addCredits(earnedCredits, 'Survey Completion');
    setSurveyProgress(0);
  };

  const addCredits = (amount, reason) => {
    setCredits(prevCredits => prevCredits + amount);
    setCreditHistory(prevHistory => [
      { amount, reason, date: new Date().toISOString() },
      ...prevHistory
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Earn Etomart Credits</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Credits</h2>
        <motion.div
          key={credits}
          initial={{ scale: 1.5, color: '#ee9613' }}
          animate={{ scale: 1, color: '#000' }}
          className="text-4xl font-bold"
        >
          {credits}
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Gift className="mr-2 text-orange-600" /> Refer a Friend
          </h3>
          <p className="text-sm text-gray-600 mb-4">Earn credits by referring friends to Etomart!</p>
          <form onSubmit={handleReferralSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter friend's referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition duration-300"
            >
              Submit Referral
            </button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Award className="mr-2 text-orange-600" /> Daily Login Bonus
          </h3>
          <p className="text-sm text-gray-600 mb-4">Log in daily to earn bonus credits!</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Daily Streak: {dailyStreak} days</span>
            <span className="text-sm font-medium">Next Bonus: {Math.min(10 + dailyStreak + 1, 50)} credits</span>
          </div>
          <button
            onClick={handleDailyBonus}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition duration-300"
          >
            Claim Daily Bonus
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FileText className="mr-2 text-orange-600" /> Complete Surveys
          </h3>
          <p className="text-sm text-gray-600 mb-4">Earn credits by completing short surveys.</p>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Survey Progress</span>
              <span className="text-sm font-medium">{surveyProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${surveyProgress}%` }}></div>
            </div>
          </div>
          <button
            onClick={() => setSurveyProgress(Math.min(surveyProgress + 25, 100))}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition duration-300"
            disabled={surveyProgress === 100}
          >
            {surveyProgress === 100 ? 'Survey Completed' : 'Continue Survey'}
          </button>
          {surveyProgress === 100 && (
            <button
              onClick={handleSurveyComplete}
              className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition duration-300"
            >
              Claim Survey Credits
            </button>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <TrendingUp className="mr-2 text-orange-600" /> Credit History
          </h3>
          <div className="max-h-60 overflow-y-auto">
            <AnimatePresence>
              {creditHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{entry.reason}</p>
                    <p className="text-sm text-gray-600">
                      <Clock className="inline-block mr-1" size={14} />
                      {new Date(entry.date).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-green-600 font-medium">+{entry.amount}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCredits;