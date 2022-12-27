import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from '../components/shared/Button'
import Container from '../components/shared/Container'

const Home = () => {
  return (
    <Container>
      <div className='my-[5rem] lg:mx-[20rem] px-4 py-2.5'>
        <section className='lg:text-center'>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">What do you need help with?</h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Support Desk we focus on helping users with the best experience in lodging and resolving their complaints</p>
        </section>

        <div className='w-full'>

          <div className='w-2/4 mx-auto'>
            <Link to="/new-ticket">
              <Button variant='white' className='w-full'>
                <span className='flex flex-auto items-center gap-3 justify-center'>
                  <FaQuestionCircle /> Create new ticket
                </span>
              </Button> 
            </Link>
          </div>
          
          <div className='w-2/4 mx-auto'>
            <Link to="/tickets">
              <Button className='w-full'>
                <span className='flex flex-auto items-center gap-3 justify-center'>
                    <FaTicketAlt /> View my tickets
                </span>
              </Button> 
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home