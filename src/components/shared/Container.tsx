import React from 'react'

const Container = ({ children }: { children: JSX.Element}) => {
  return (
    <div className='min-w-full py-6 px-4 text-center'>
        {children}
    </div>
  )
}

export default Container