import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Plus,
  Bookmark,
  User,
  Settings,
  LogOut,
  Lightbulb,
} from 'lucide-react';
import axios from 'axios';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { label: 'My Projects', icon: Home, path: '/dashboard' },
    { label: 'Create Project', icon: Plus, path: '/projectForm' },
    { label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  const bottomItems = [
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Logout', icon: LogOut, action: logoutUser },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col shadow-xl fixed h-screen left-0 top-0 z-50`}
    
          onMouseEnter={() => setSidebarOpen(true) }
          onMouseLeave={()=> setSidebarOpen(false)}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <Lightbulb size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">DevHub</h1>
          </div>
        )}
        {!sidebarOpen && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto">
            <Lightbulb size={24} className="text-white" />
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon
                size={24}
                className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                  active ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'
                }`}
              />
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-700"></div>

      {/* Bottom Items */}
      <div className="px-4 py-4 space-y-2 border-t border-gray-700">
        {bottomItems.map((item, idx) => {
          const Icon = item.icon;
          const active = item.path && isActive(item.path);
          return item.action ? (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200 group text-left"
              title={!sidebarOpen ? item.label : ''}
            >
              <Icon
                size={24}
                className="flex-shrink-0 transition-transform group-hover:scale-110"
              />
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              title={!sidebarOpen ? item.label : ''}
            >
              <Icon
                size={24}
                className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                  active ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'
                }`}
              />
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>     
    </div>
  );
};

export default Sidebar;
