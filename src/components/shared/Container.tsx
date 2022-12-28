import React from 'react'

const Container = ({ children }: { children: JSX.Element}) => {
  return (
    <div className='min-w-full py-6 px-4'>
        {children}
    </div>
  )
}

export default Container