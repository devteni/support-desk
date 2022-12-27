import React from 'react'

const Card = ({ children, className }: { children: JSX.Element, className?: string }) => {
  return (
    <div className={`${className ?? ''} flex flex-col gap-6 py-4 px-2 rounded-lg`}>
        {children}
    </div>
  )
}

export default Card