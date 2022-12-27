import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full flex flex-row justify-between items-center px-5 py-4 border-bottom border-2'>
        <div className='text-black font-bold'>
            <Link to='/'>Support Desk</Link>
        </div>

        <ul className='flex flex-row justify-between gap-5'>
            <li>
              <Link to="/login" className='flex items-center gap-2'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" className='flex items-center gap-2'>
                <FaUser /> Register
              </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header