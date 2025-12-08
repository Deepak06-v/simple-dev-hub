import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Heart, Bookmark, Eye, Github, ExternalLink, User, Layers, Calendar, Share2 ,Trash, AwardIcon} from 'lucide-react'
import CardSkills from './cardSkills'

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [bookmarkCount, setBookmarkCount] = useState(0)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/product/${id}`, {
          withCredentials: true
        })
        
        if (response.data.success) {
          setProject(response.data.product)
          setLikeCount(response.data.product.likes?.length || 0)
          setBookmarkCount(response.data.product.bookmarks?.length || 0)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching project:', err)
        setError(err.response?.data?.message || 'Failed to load project details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/product/${id}/toggle-like`, {}, {
        withCredentials: true
      })
      setIsLiked(!isLiked)
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    } catch (err) {
      console.error('Error toggling like:', err)
      alert('Please login to like projects')
    }
  }

  const handleDelete=async ()=>{
    try{
      alert("Are u sure want to delete this project ?")
      const response=await axios.get(`http://localhost:3000/product/delete/${id}`,{withCredentials:true})
      if(response.data.success){
        console.log("Deleted successfully")
      }
      navigate("/dashboard")
    } catch(err){
      alert("Error while deleting.")
    }
  }

  const handleBookmark = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/product/${id}/toggle-bookmark`, {}, {
        withCredentials: true
      })
      setIsBookmarked(!isBookmarked)
      setBookmarkCount(isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1)
    } catch (err) {
      console.error('Error toggling bookmark:', err)
      alert('Please login to bookmark projects')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Error Loading Project</h1>
          <p className="text-gray-300 mb-6">{error || 'Project not found'}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="hover:bg-blue-700 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 ml-64 transition-all duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <div id='nav' className='flex justify-between'>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mb-8 bg-blue-500 text-white p-2 rounded-lg hover:text-blue-300 flex items-center gap-2 transition font-semibold"
        >
          ← Back to Projects
        </button>
        <div id='nav2' className='flex justify-center align-middle gap-3'>
          <button
          onClick={handleDelete} 
          className="mb-8 bg-blue-500 text-white p-2 rounded-lg hover:text-blue-300 flex items-center gap-2 transition font-semibold"
        >
          <Trash />
          Delete
        </button>
        <button 
          className="mb-8 bg-blue-500 text-white p-2 rounded-lg hover:text-blue-300 flex items-center gap-2 transition font-semibold"
        >
          Edit
        </button>
        </div>
        </div>
        {/* Main Content Card */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          
          {/* Thumbnail Image */}
          <div className="relative h-96 bg-gradient-to-b from-blue-600 to-gray-800 overflow-hidden">
            <img 
              src={project.thumbnail || 'https://images.pexels.com/photos/2903985/pexels-photo-2903985.jpeg'} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
            
            {/* Visibility Badge */}
            <div className="absolute top-4 right-4 bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2">
              <Eye size={16} className="text-white" />
              <span className="text-white font-semibold capitalize">{project.visibility || 'private'}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-12">
            
            {/* Title and Owner */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
              <div className="flex items-center gap-3 text-gray-400">
                <User size={20} />
                <span className="text-lg">by <span className="text-blue-400 font-semibold">{project.owner?.name || 'Anonymous'}</span></span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-700">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  isLiked 
                    ? 'bg-red-600 text-red-200 border border-red-500' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                Likes ({likeCount})
              </button>

              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  isBookmarked 
                    ? 'bg-yellow-600 text-yellow-200 border border-yellow-500' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                Bookmarks ({bookmarkCount})
              </button>

              {/* Share Button */}
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={24} className="text-blue-400" />
                About This Project
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {project.description || 'No description provided'}
              </p>
            </div>

            {/* Tech Stack Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Layers size={24} className="text-blue-400" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack && project.techStack.length > 0 ? (
                  project.techStack.map((tech, index) => (
                    <div key={index} className="bg-blue-600 bg-opacity-30 border border-blue-500 text-blue-300 px-4 py-2 rounded-full font-semibold hover:bg-opacity-50 transition">
                      {tech}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No tech stack specified</p>
                )}
              </div>
            </div>

            {/* Project Links Section */}
            <div className="pb-8 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <ExternalLink size={24} className="text-blue-400" />
                Project Links
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Repository Link */}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition border border-gray-600"
                  >
                    <Github size={20} />
                    View Repository
                  </a>
                )}

                {/* Live Link */}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
                  >
                    <ExternalLink size={20} />
                    View Live Project
                  </a>
                )}
              </div>
            </div>

            {/* Project Metadata - Repository and Live URLs only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-gray-400 text-sm mb-2">Repository</h3>
                <p className="text-gray-200 font-mono text-sm break-all">{project.repoUrl || 'N/A'}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <h3 className="text-gray-400 text-sm mb-2">Live Preview</h3>
                <p className="text-gray-200 font-mono text-sm break-all">{project.liveUrl || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details