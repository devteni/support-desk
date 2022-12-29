import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout, reset } from '../slices/auth/auth';
import Button from './shared/Button';

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Add confirmation modal to logout
  const onLogout = () => {
    dispatch(logout({}));
  }

  return (
    <header className='min-w-full flex flex-row justify-between items-center px-5 py-4 border-bottom border-2'>
        <div className='text-black font-bold'>
            <Link to='/'>Support Desk</Link>
        </div>

        <ul className='flex flex-row justify-between gap-5'>
          {
            Object.keys(user).length > 1 ? 
              <li>
              <Button variant='danger' onClick={onLogout}>
                <span className='flex items-center gap-2'>
                  <FaSignOutAlt /> Logout
                </span>
              </Button>
            </li> :
            <>
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
            </>
          }
        </ul>
    </header>
  )
}

export default Header