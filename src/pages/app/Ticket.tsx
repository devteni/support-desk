import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../components/shared/BackButton';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Container from '../../components/shared/Container'
import { TICKET_STATUS } from '../../components/TicketItem';
import ProcessError from '../../lib/error';
import ticketService from '../../slices/tickets/ticket.service';

const Ticket = () => {
    const { id } = useParams();

    const { data: ticket, refetch, isLoading } = useQuery({
        queryKey: ['get-tickets'],
        queryFn: async () => {
            const res = await ticketService.getTicket(id!);

            return res.data;
        },
        onError: (err) => ProcessError(err)
    });

    // Add confirmation modal
    const closeTicket = async () => {
        window.alert('Are you sure you want to close this ticket?');

        await ticketService.closeTicket(id!);

        toast.success('Ticket closed');

        refetch();
    }

    console.log(ticket);

    if (isLoading) {
        return <div>...</div>
    }

  return (
    <Container>
        <section className='w-3/5 mx-auto'>
            <div className='mb-6'>
                <BackButton url='/tickets'/>
            </div>
            <div className='border-b-2 py-2'>
                <div className='flex flex-wrap justify-between'>
                    <span className='font-bold text-xl'>
                        Ticket ID: {ticket._id}
                    </span>
                    <span className='font-bold'>
                    Status: <span className={`px-4 py-2 rounded-lg ${TICKET_STATUS[`${ticket.status}`]}`}>
                        {ticket.status}
                        </span>
                    </span>
                </div>
                <h3 className='text-left font-semibold text-md'>Date submitted: { !isLoading && new Date(ticket.createdAt).toLocaleString('en-US') }</h3>
                <h3 className='text-left font-semibold text-md'>Product: {ticket.product}</h3>

            </div>

            <Card className='p-2 rounded-lg bg-gray-100 my-6'>
                <div className='px-4'>
                    <p className='text-xl font-bold mb-2'>Description of Issue</p>
                    <p>
                        {ticket.description}
                    </p>
                </div>
            </Card>

            {
                ticket.status !== 'closed' &&
                <Button className='w-full' variant='danger' onClick={() => closeTicket()}>Close Ticket</Button>
            }
        </section>
    </Container>
  )
}

export default Ticket