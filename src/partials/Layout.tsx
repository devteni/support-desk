import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

const Layout = ({ auth, secured }: { auth: any, secured: boolean }) => {
    const outlet = useOutlet();

    if (secured) {
      if (Object.keys(auth).length < 1 || auth.message) {
        return <Navigate to="/login" />;
      } else {
        return (
          <div>
              {outlet}
          </div>
        )
      }
    }

  return <Navigate to="/login" />;
}

export default Layout