import React, { useState } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import FormInput from '../components/shared/FormInput';
import { useAppDispatch } from '../hooks/redux';
import { login } from '../slices/auth/auth';

const Login = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: 'hi@teniolafatunmbi.com',
    password: 'dev',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  }

  return (
    <div className='h-screen flex flex-col'>
      <section className='mx-auto lg:my-[10rem] my-10 w-full lg:w-2/5 md:w-2/5'>
        <div className='text-center mb-8'>
          <h1 className='font-bold text-2xl flex gap-3 items-center justify-center'><FaSignInAlt /> Login</h1>
          <p className='text-gray-600 text-md'>Login to get support</p>
        </div>

        <Card className='w-full lg:w-4/5 md:w-full mx-auto'>
          <div className='lg:px-10'>
            <form className='mb-6' onSubmit={handleSubmit}>
              <FormInput
                name="email"
                type='email'
                label="Email address"
                placeholder='johndoe@outlook.com'
                value={formData.email}
                onChange={handleChange}
                required={true}
              />
              <FormInput
                name="password"
                type='password'
                label="Password"
                placeholder=''
                value={formData.password}
                onChange={handleChange}
                required={true}
              />

              <Button type='submit' variant='dark' className='w-full'>Login</Button>
            </form>
          </div>          
        </Card>
      </section>
    </div>
  )
}

export default Login