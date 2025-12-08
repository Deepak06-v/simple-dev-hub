import React from 'react'

const cardSkills = (props) => {
  return (
    <div>
        <span className='bg-blue-600 bg-opacity-30 border border-blue-500 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold hover:bg-opacity-50 transition'>{props.tech}</span>
    </div>
  )
}

export default cardSkills