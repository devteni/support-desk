import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import FormInput from '../components/shared/FormInput';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmedPassword: ''
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

    const { password, confirmedPassword } = formData;

    if (password !== confirmedPassword) {
      toast.error('Passwords do not match');
    }
  }

  return (
    <div className='h-screen flex flex-col'>
      <section className='mx-auto lg:my-[10rem] my-10 w-full lg:w-2/5 md:w-2/5'>
        <div className='text-center mb-8'>
          <h1 className='font-bold text-2xl flex gap-3 items-center justify-center'><FaUser /> Register</h1>
          <p className='text-gray-600 text-md'>Create an account</p>
        </div>

        <Card className='w-full lg:w-4/5 md:w-full mx-auto'>
          <div className='lg:px-10'>
            <form className='mb-6' onSubmit={handleSubmit}>
              <div className='flex flex-col lg:flex-row md:flex-row lg:gap-4 md:gap-4 justify-between'>
                <FormInput
                  name="first_name"
                  label="First name"
                  placeholder='John'
                  value={formData.first_name}
                  onChange={handleChange}
                  required={true}
                  className="lg:w-[15rem] md:w-[15rem]"
                />
                <FormInput
                  name="last_name"
                  label="Last name"
                  placeholder='Doe'
                  value={formData.last_name}
                  onChange={handleChange}
                  required={true}
                  className="lg:w-[15rem] md:w-[15rem]"
                />
              </div>
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

              <FormInput
                name="confirmedPassword"
                type='password'
                label="Confirm password"
                value={formData.confirmedPassword}
                onChange={handleChange}
                required={true}
              />

              <Button type='submit' className='w-full'>Register</Button>
            </form>
          </div>          
        </Card>
      </section>
    </div>
  )
}

export default Register