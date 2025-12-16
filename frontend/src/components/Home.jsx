import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Home as HomeIcon, TrendingUp, Users, Zap } from 'lucide-react';
import Loader from './Loader';
import PublicCard from './public/PublicCard';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [stats, setStats] = useState({ totalProjects: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all public projects
        const projectRes = await axios.get(
          "http://localhost:3000/product/all",
          { withCredentials: true }
        );
        
        setAllProjects(projectRes.data.products || []);
        setStats({
          totalProjects: projectRes.data.count || 0,
          totalUsers: Math.ceil((projectRes.data.count || 0) / 3) // Rough estimate
        });
        
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='bg-gray-900 min-h-screen ml-64 transition-all duration-300'>
      <div id="main" className="flex justify-center p-6">
        <div id="middle" className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <HomeIcon size={40} className="text-blue-500" />
                <h1 className="text-5xl font-bold text-white">Welcome to DevHub</h1>
              </div>
              <p className="text-gray-400 text-xl">Discover amazing developer projects and showcase your work</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Projects</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalProjects}</p>
                  </div>
                  <TrendingUp size={32} className="text-blue-500 opacity-50" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Active Users</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}+</p>
                  </div>
                  <Users size={32} className="text-blue-500 opacity-50" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Communities</p>
                    <p className="text-3xl font-bold text-white mt-2">500+</p>
                  </div>
                  <Zap size={32} className="text-blue-500 opacity-50" />
                </div>
                </div>
            </div>
            
          </div>

          {/* Featured Projects Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
              <p className="text-gray-400">Check out what the community is building</p>
            </div>

            {allProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.slice(0, 9).map((project) => (
                  <PublicCard key={project._id} data={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <HomeIcon size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">No projects yet</h3>
                <p className="text-gray-500">Be the first to create a project!</p>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="mt-16 py-8 border-t border-gray-700">
            <div className="text-center text-gray-400">
              <p className="mb-2">© 2024 DevHub. All rights reserved.</p>
              <p className="text-sm">Join our community and showcase your amazing projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;