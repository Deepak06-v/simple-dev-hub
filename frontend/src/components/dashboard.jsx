import React, { useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import Projectcard from './projectcard';
import axios from 'axios';
import { set } from 'mongoose';
import Loader from './Loader';

const Dashboard = () => {
  const [loading ,setLoading ] = useState(true);
  const [projects, setProjects] = useState([]);
  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [search,setSearch]=useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/product/my-products",
          { withCredentials: true }
        );
        setProjects(res.data.products); 
        setLoading(false);
      } catch (err) {
        console.log("Not authorized, redirecting...");
        window.location.href = "/signup";
      }
    };

    fetchData();
  }, []); 

  if (loading) return <Loader />;

  return (
    <div className='bg-gray-900 min-h-screen ml-64 transition-all duration-300'>
      <div id="main" className="flex justify-center p-6">
        <div id="middle" className="w-full max-w-6xl">
          <div
            id="topBarInMiddle"
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="font-bold text-4xl text-white mb-2">
                My Projects
              </h1>
              <p className="text-gray-400">Manage and showcase your amazing projects</p>
            </div>
          </div>

          <div id="mainContentInMiddle">
            {projects.filter((p)=>{
              if(search===""){
                return p;
              } else if(p.title.toLowerCase().includes(search.toLowerCase())){
                return p;
              }
            }).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter((p)=>{
                  if(search===""){
                    return p;
                  } else if(p.title.toLowerCase().includes(search.toLowerCase())){
                    return p;
                  }
                }).map((p, i) => (
                  <Projectcard key={i} data={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-gray-500 text-6xl h-[40vh] mb-4">📭</div>
                <p className="text-gray-400 text-lg">No projects found</p>
                <p className="text-gray-400 text-sm mt-2">Create your first project to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
