import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, MapPin, Link as LinkIcon, Github, Linkedin, Edit2, Save } from 'lucide-react';
import Loader from './Loader';

const trProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/user/profile",
          { withCredentials: true }
        );
        if (res.data.success) {
          setUser(res.data.user);
          setFormData(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/user/profile",
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setUser(res.data.user);
        setEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='bg-gray-900 min-h-screen ml-64 transition-all duration-300'>
      <div id="main" className="flex justify-center p-6">
        <div id="middle" className="w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="font-bold text-4xl text-white mb-2 flex items-center gap-3">
              <User size={40} className="text-blue-500" />
              My Profile
            </h1>
            <p className="text-gray-400">Manage your profile information</p>
          </div>

          {user && (
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
              {/* Profile Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user.name || 'User'}</h2>
                    <p className="text-gray-400">@{user.username || 'username'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  {editing ? <Save size={20} /> : <Edit2 size={20} />}
                  {editing ? 'Save' : 'Edit'}
                </button>
              </div>

              {/* Profile Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 rounded-lg ${
                      editing
                        ? 'bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-700 text-gray-300'
                    } outline-none transition`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg ${
                      editing
                        ? 'bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-700 text-gray-300'
                    } outline-none transition resize-none`}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Github size={16} />
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 rounded-lg ${
                      editing
                        ? 'bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-700 text-gray-300'
                    } outline-none transition`}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <Linkedin size={16} />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 rounded-lg ${
                      editing
                        ? 'bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        : 'bg-gray-700 text-gray-300'
                    } outline-none transition`}
                  />
                </div>
              </div>

              {editing && (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData(user);
                    }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
