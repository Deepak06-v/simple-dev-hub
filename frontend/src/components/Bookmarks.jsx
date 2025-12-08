import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bookmark } from 'lucide-react';
import Projectcard from './projectcard';
import Loader from './Loader';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/product/bookmarked",
          { withCredentials: true }
        );
        setBookmarks(res.data.bookmarks || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setError("Failed to load bookmarks");
        setBookmarks([]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='bg-gray-900 min-h-screen ml-64 transition-all duration-300'>
      <div id="main" className="flex justify-center p-6">
        <div id="middle" className="w-full max-w-6xl">
          <div id="topBarInMiddle" className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-bold text-4xl text-white mb-2 flex items-center gap-3">
                <Bookmark size={40} className="text-blue-500" />
                My Bookmarks
              </h1>
              <p className="text-gray-400">Your saved projects collection</p>
            </div>
          </div>

          <div id="mainContentInMiddle">
            {error ? (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-6 text-red-300 text-center">
                {error}
              </div>
            ) : bookmarks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.map((project) => (
                  <Projectcard key={project._id} data={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Bookmark size={64} className="mx-auto text-gray-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-400 mb-2">No bookmarks yet</h2>
                <p className="text-gray-500">Bookmark projects to save them for later</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
