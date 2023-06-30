import React from 'react'

const Content = ({children}) => {
  return (
    <div className='md:pl-40 pt-20 flex justify-center md:justify-start'>
        <p>{children}</p>
    </div>
  )
}

export default Content