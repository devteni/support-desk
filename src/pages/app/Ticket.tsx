import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import Container from '../../components/shared/Container'
import ProcessError from '../../lib/error';
import ticketService from '../../slices/tickets/ticket.service';

const Ticket = () => {
    const { id } = useParams();

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['get-tickets'],
        queryFn: async () => {
            const res = await ticketService.getTicket(id!);

            return res.data;
        },
        onError: (err) => ProcessError(err)
    });

    console.log(data);

  return (
    <Container>
        <>
            <div>

            </div>
        </>
    </Container>
  )
}

export default Ticket