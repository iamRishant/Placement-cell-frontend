import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
        <h1>navbar</h1>
        {children}
        <h1>footer</h1>
    </div>
  )
}

export default Layout