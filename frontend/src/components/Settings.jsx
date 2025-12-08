import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Trash2, LogOut } from 'lucide-react';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    privateProfile: false,
    emailUpdates: true,
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      // Save settings logic here
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      try {
        await axios.get(
          "http://localhost:3000/user/deleteUser",
          { withCredentials: true }
        );
        window.location.href = "/login";
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account");
      }
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      await axios.post(
        "http://localhost:3000/user/logout-all",
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen ml-64 transition-all duration-300'>
      <div id="main" className="flex justify-center p-6">
        <div id="middle" className="w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="font-bold text-4xl text-white mb-2 flex items-center gap-3">
              <SettingsIcon size={40} className="text-blue-500" />
              Settings
            </h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>

          {saved && (
            <div className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-300">
              Settings saved successfully!
            </div>
          )}

          {/* Notifications Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                <div>
                  <h3 className="text-white font-semibold">Push Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive notifications about your projects</p>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.notifications ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                <div>
                  <h3 className="text-white font-semibold">Email Updates</h3>
                  <p className="text-gray-400 text-sm">Receive email updates about new features</p>
                </div>
                <button
                  onClick={() => handleToggle('emailUpdates')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.emailUpdates ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.emailUpdates ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                <div>
                  <h3 className="text-white font-semibold">Private Profile</h3>
                  <p className="text-gray-400 text-sm">Make your projects visible only to you</p>
                </div>
                <button
                  onClick={() => handleToggle('privateProfile')}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.privateProfile ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.privateProfile ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Account Management</h2>

            <div className="space-y-4">
              <button
                onClick={handleLogoutAllDevices}
                className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
              >
                <div className="text-left">
                  <h3 className="font-semibold">Logout All Devices</h3>
                  <p className="text-gray-400 text-sm">Sign out from all devices</p>
                </div>
                <LogOut size={20} className="text-yellow-500" />
              </button>

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-4 bg-red-900 bg-opacity-30 hover:bg-opacity-50 border border-red-600 rounded-lg text-red-300 transition"
              >
                <div className="text-left">
                  <h3 className="font-semibold">Delete Account</h3>
                  <p className="text-red-400 text-sm">Permanently delete your account and data</p>
                </div>
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
