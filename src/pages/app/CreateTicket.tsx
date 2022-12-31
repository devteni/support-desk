import React, { TextareaHTMLAttributes, useEffect, useState } from 'react'
import { FaMailBulk } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Container from '../../components/shared/Container'
import FormInput from '../../components/shared/FormInput';
import FormSelect from '../../components/shared/FormSelect';
import Textarea from '../../components/shared/Textarea';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createTicket } from '../../slices/tickets/ticket';

const CreateTicket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [ticket, setTicket] = useState<Record<string, string>>({
      product: '',
      description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(createTicket(ticket));
    window.location.href = '/tickets';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    e.persist();

    setTicket((prev) => ({
        ...prev, [e.target.name]: e.target.value,
    }));
  }
  
  const PRODUCTS = ["iPhone", "Macbook Pro", "iMac", "iPad"];

  useEffect(() => {
      setTicket((prev) => ({ ...prev, product: PRODUCTS[0]}))
  }, [])

  return (
    <Container>
        <>
        <section className='mx-auto lg:my-[10rem] my-10 w-full lg:w-2/5 md:w-2/5'>
            <div className='text-center mb-8'>
        <BackButton url='/tickets'/>

              <h1 className='font-bold text-2xl flex gap-3 items-center justify-center'><FaMailBulk /> Create New Ticket</h1>
              <p className='text-gray-600 text-md'>Fill out the form below</p>
            </div>

        <Card className='w-full lg:w-4/5 md:w-full mx-auto'>
          <div className='lg:px-10'>
            <form className='mb-6 text-left' onSubmit={handleSubmit}>

                <FormSelect 
                    label={'Product'}
                    name={"product"}
                    options={PRODUCTS}
                    defaultValue={PRODUCTS[0]}
                    onChange={(e) => setTicket((prev) => ({...prev, product: e.target.value }))}
                /> 
                
                <Textarea
                name="description"
                label="Description"
                placeholder='Write your description here'
                value={ticket.description}
                onChange={handleChange}
                required={true}
                />

              <Button type='submit' variant='dark' className='w-full'>Submit</Button>
            </form>
          </div>          
        </Card>
      </section>
        </>
    </Container>
  )
}

export default CreateTicket