import React from 'react'
import { useOutlet } from 'react-router-dom'

const Layout = ({ auth, secured }: { auth: any, secured: boolean }) => {
    const outlet = useOutlet();
  return (
    <div>
        {outlet}
    </div>
  )
}

export default Layout