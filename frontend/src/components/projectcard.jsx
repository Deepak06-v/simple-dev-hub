import React from 'react'
import CardSkills from './cardSkills';
import { Link } from 'react-router-dom';

const projectcard = (props) => {
  console.log(props.data._id);
  
  return (
    <div className='bg-gray-800 h-auto w-full max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-700 transition duration-300 transform hover:scale-105'>
       <div className='h-[200px] w-full rounded-t-xl bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden'>
        <img src={props.data.thumbnail} alt="projectimage" className='h-full w-full rounded-lg object-cover'/>
        </div>
        <div className='p-4'>
        <h1 className='mt-2 mb-3 font-bold text-xl tracking-wide text-white hover:text-blue-400 transition' >
          <Link to={`/details/${props.data._id}`} state={{data: props.data}}>
            {props.data.title}
          </Link>                     
          </h1>
        <p className='text-gray-400 text-sm mb-4 line-clamp-2'>{props.data.description || 'No description'}</p>
        <div className='flex mt-3 gap-2 flex-wrap'>
        {
            props.data.techStack.slice(0, 3).map((tech, index) => (
            <CardSkills key={index} tech={tech} />
          ))
        }
          {props.data.techStack.length > 3 && (
            <span className='text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full'>+{props.data.techStack.length - 3}</span>
          )}
        </div>
        <div className='flex justify-between items-center mt-4 pt-4 border-t border-gray-700'>
        <div className='flex items-center gap-2'>
          <span className='text-red-400'>❤️</span>
          <h1 className='text-gray-300 text-sm'>{props.data.likes?.length || 0}</h1>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-yellow-400'>🔖</span>
          <h1 className='text-gray-300 text-sm'>{props.data.bookmarks?.length || 0}</h1>
        </div>
        </div>
        </div>
    </div>
  )
}

export default projectcard