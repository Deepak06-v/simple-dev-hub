import React from 'react'
import Select from "react-select";
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Navigate } from 'react-router-dom';
const techOptions = [
  // Frontend
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Tailwind CSS", value: "tailwind" },
  { label: "Bootstrap", value: "bootstrap" },

  // Backend
  { label: "Node.js", value: "node" },
  { label: "Express.js", value: "express" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "FastAPI", value: "fastapi" },
  { label: "Spring Boot", value: "springboot" },

  // Databases
  { label: "MongoDB", value: "mongodb" },
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "SQLite", value: "sqlite" },
  { label: "Redis", value: "redis" },

  // Mobile
  { label: "React Native", value: "reactnative" },
  { label: "Flutter", value: "flutter" },

  // DevOps
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "k8s" },
  { label: "AWS", value: "aws" },
  { label: "Firebase", value: "firebase" },
  { label: "CI/CD", value: "cicd" },

  // Others
  { label: "Git", value: "git" },
  { label: "GraphQL", value: "graphql" },
  
  // Custom
  { label: "Other", value: "other" }
];


const ProjectForm = () => {
  async function handleSubmit(event) {
    event.preventDefault()
    try{
      await axios.post("http://localhost:3000/product/add",
  {
    title,
    description,
    techStack: selectedOptions,
    repoUrl: repoLink,
    liveUrl: liveLink,
    thumbnail: thumbnailLink,   // FIXED NAME
    visibility: "public"        // or anything you want
  },
  { withCredentials: true }
).then((res)=>{
        if(res.status===201){
          window.location.href="/dashboard";
          alert("Project created successfully");
        }
      })
    }catch(error){
      console.log(error.response);
      alert("Failed to create project. Please try again.");
    }
    
  }

const [selectedOptions, setSelectedOptions] = React.useState([]);
const handleChange = (options) => {
  const values = options ? options.map(opt => opt.value) : [];
  setSelectedOptions(values);
};
const [title,setTitle]=React.useState("");
const [description,setDescription]=React.useState("");
const [repoLink,setRepoLink]=React.useState("");
const [liveLink,setLiveLink]=React.useState("");
const [thumbnailLink,setThumbnailLink]=React.useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ml-64 transition-all duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div><h1 className="text-4xl font-bold text-white mb-2">Create New Project</h1>
          <p className="text-gray-400">Share your amazing project with the community</p>
          </div>
          <div>
              <IoArrowBackCircleSharp className='h-[40px] w-[40px] cursor-pointer text-blue-400 hover:text-blue-300 transition' onClick={() => window.location.href="/dashboard"} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe your project in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              required
            ></textarea>
          </div>

          {/* Tech Stack Field */}
          <div>
            <label htmlFor="techstack" className="block text-sm font-semibold text-gray-300 mb-2">
              Tech Stack <span className="text-red-500">*</span>
            </label>
            <Select
              isMulti
              name="techstack"
              id="techstack"
              options={techOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              placeholder="Select technologies used in your project..."
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                  borderColor: '#4b5563',
                  color: '#fff',
                  '&:hover': { borderColor: '#60a5fa' },
                  '&:focus-within': { boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)', borderColor: '#2563eb' },
                  borderRadius: '0.5rem',
                  padding: '0.25rem',
                  minHeight: '44px'
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#4b5563' : '#1f2937',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.75rem'
                })
              }}
              required
            />
          </div>

          {/* Repository Link */}
          <div>
            <label htmlFor="repo" className="block text-sm font-semibold text-gray-300 mb-2">
              Repository Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="repo"
              id="repo"
              placeholder="https://github.com/username/repo"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Live Project Link */}
          <div>
            <label htmlFor="live" className="block text-sm font-semibold text-gray-300 mb-2">
              Live Project Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="live"
              id="live"
              placeholder="https://yourproject.com"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Thumbnail Link */}
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-300 mb-2">
              Thumbnail Image Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="thumbnail"
              id="thumbnail"
              placeholder="https://example.com/thumbnail.jpg"
              value={thumbnailLink}
              onChange={(e) => setThumbnailLink(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <p className="mt-1 text-sm text-gray-400">Recommended size: 1200x630px</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-md"
            >
              Create Project
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-400 text-center">
            All fields marked with <span className="text-red-500">*</span> are required
          </p>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm