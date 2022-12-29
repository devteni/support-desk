import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import Container from '../../components/shared/Container'
import TicketItem from '../../components/TicketItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import ProcessError from '../../lib/error';
import { getTickets, setIsLoading, setItemsPerPage, setTickets, setTotalTickets } from '../../slices/tickets/ticket';
import ticketService from '../../slices/tickets/ticket.service';

const Tickets = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { tickets, itemsPerPage, currentPage, total} = useAppSelector((state) => state.ticket)
  
  const fetchTickets = async () => {
    dispatch(getTickets());
  }

  const handleSuccess = (data: Record<string, any>) => {
    dispatch(setTickets(data?.items));
    dispatch(setTotalTickets(data?.total));
    dispatch(setIsLoading(false));
  }

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['get-tickets'],
    queryFn: async () => {
      setIsLoading(isLoading);
      const res = await ticketService.fetchTickets({ page: currentPage, size: itemsPerPage });

      return res;
    },
    onSuccess: ({ data }) => handleSuccess(data),
    onError: (err) => ProcessError(err)
  });

  console.log(data, tickets, itemsPerPage, currentPage, total)

  // Create spinner component for tickets
  if(isLoading) {
    return <div>...</div>
  }

  return (
    <Container>
      <>
        <section className='w-full lg:w-3/5 mx-auto my-10'>
          <div className="flex flex-row justify-between mb-6">
            <h1 className='text-3xl'>Tickets</h1>
            <Button onClick={() => navigate('/new-ticket')}>
              Add Ticket
            </Button>
          </div>
          <table className='w-full'>
            <tr className='bg-gray-100'>
              <th className='font-bold text-2xl py-2'>Date</th>
              <th className='font-bold text-2xl py-2'>Product</th>
              <th className='font-bold text-2xl py-2'>Status</th>
              <th></th>
            </tr>
            <tbody>
              { tickets?.map((ticket: any, idx: number) => {
                return <TicketItem key={idx + Math.random()} ticket={ticket} />
              })}
            </tbody>
          </table>
        </section>
      </>
    </Container>
  )
}

export default Tickets