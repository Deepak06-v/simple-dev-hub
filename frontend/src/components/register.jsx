import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  setLoading(true);
  setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/user/register",
        {
          name,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
      navigate("/dashboard");
      }


    }catch (error) {
      console.log(error.response?.data);
          setError(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
          setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <UserPlus size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DevHub</h1>
          <p className="text-gray-400">Join our developer community</p>
        </div>

        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">

            <div className="flex flex-col text-left">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 mt-6"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Login here
            </Link>
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 DevHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
