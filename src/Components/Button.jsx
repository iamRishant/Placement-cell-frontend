import React from 'react'

const Button = ({children}) => {
  return (
    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg w-[24vh]
    flex items-center justify-center hover:scale-105 hover:bg-gradient-to-r
    hover:from-blue-500 hover:to-purple-200 font-semibold cursor-pointer gap-3'>
      {children}</button>
  )
}

export default Button