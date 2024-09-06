import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Globe, DollarSign, Save, CheckCircle } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    currency: 'USD',
    fontSize: 'medium',
    autoplay: true,
    dataUsage: 'high'
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (setting, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Implement logic to save settings to backend
    console.log('Saving settings:', settings);
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <motion.div
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
        checked ? 'bg-orange-600' : 'bg-gray-300'
      }`}
      onClick={onChange}
    >
      <motion.div
        className="bg-white w-5 h-5 rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        animate={{ x: checked ? 28 : 0 }}
      />
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="mr-2 text-orange-600" /> Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Receive Email Notifications</span>
                <ToggleSwitch
                  checked={settings.emailNotifications}
                  onChange={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Receive Push Notifications</span>
                <ToggleSwitch
                  checked={settings.pushNotifications}
                  onChange={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              {settings.darkMode ? <Moon className="mr-2 text-orange-600" /> : <Sun className="mr-2 text-orange-600" />} Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <ToggleSwitch
                  checked={settings.darkMode}
                  onChange={() => handleSettingChange('darkMode', !settings.darkMode)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2 text-orange-600" /> Language and Currency
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2 text-orange-600" /> Data Usage
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Autoplay Videos</span>
                <ToggleSwitch
                  checked={settings.autoplay}
                  onChange={() => handleSettingChange('autoplay', !settings.autoplay)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Usage</label>
                <select
                  value={settings.dataUsage}
                  onChange={(e) => handleSettingChange('dataUsage', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <motion.button
          onClick={handleSaveSettings}
          className="mt-8 bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center justify-center w-full md:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {saveStatus === 'saving' ? (
            <motion.div
              className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : saveStatus === 'saved' ? (
            <CheckCircle className="mr-2" size={20} />
          ) : (
            <Save className="mr-2" size={20} />
          )}
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Settings'}
        </motion.button>
      </div>
    </div>
  );
};

export default Settings;