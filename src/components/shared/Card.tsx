import React from 'react'

const Card = ({ children, className, style }: { children: JSX.Element, className?: string, style?: Record<string, any> }) => {
  return (
    <div className={`${className ?? ''} flex flex-col gap-6 py-4 px-2 rounded-lg`} style={style}>
        {children}
    </div>
  )
}

export default Card