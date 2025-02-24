import React from 'react'

const Button = ({children}) => {
  return (
    <button className='px-4 py-2 bg-[#EF0000] text-white rounded-full flex items-center justify-center hover:bg-black font-semibold cursor-pointer'>{children}</button>
  )
}

export default Button