import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import ProjectForm from "./components/projectForm";
import Details from "./components/Details";
import Sidebar from "./components/Sidebar";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
        {/* Routes with Sidebar */}
        <Route path="/dashboard" element={<><Sidebar /><Dashboard /></>} />
        <Route path="/projectForm" element={<><Sidebar /><ProjectForm /></>} />
        <Route path="/details/:id" element={<><Sidebar /><Details /></>} />
        <Route path="/bookmarks" element={<><Sidebar /><Bookmarks /></>} />
        <Route path="/profile" element={<><Sidebar /><Profile /></>} />
        <Route path="/settings" element={<><Sidebar /><Settings /></>} />
        
        <Route path="*" element={<div className="h-screen w-full bg-blue-500 flex justify-center items-center text-[100px]">404 Not Found!</div>} />
      </Routes>
    </>
  );
}

export default App;
