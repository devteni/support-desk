import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteItem from '../../components/NoteItem';
import BackButton from '../../components/shared/BackButton';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Container from '../../components/shared/Container'
import Modal from '../../components/shared/Modal';
import Textarea from '../../components/shared/Textarea';
import { TICKET_STATUS } from '../../components/TicketItem';
import ProcessError from '../../lib/error';
import ticketService from '../../slices/tickets/ticket.service';

const Ticket = () => {
    const { id } = useParams();
    const [noteModal, setNoteModal] = useState(false);
    const [noteText, setNoteText] = useState('');

    const { data: ticket, refetch: refetchTicket, isLoading: isTicketLoading } = useQuery({
        queryKey: ['get-tickets'],
        queryFn: async () => {
            const res = await ticketService.getTicket(id!);

            return res.data;
        },
        onError: (err) => ProcessError(err)
    });

    const { data: notes, refetch: refetchNotes, isLoading: isNotesLoading } = useQuery({
        queryKey: ['get-ticket-notes'],
        queryFn: async () => {
            const res = await ticketService.getNotes({ ticketId: id! });

            return res.data;
        },
        onError: (err) => ProcessError(err)
    });
    // Add confirmation modal
    const closeTicket = async () => {
        window.alert('Are you sure you want to close this ticket?');

        await ticketService.closeTicket(id!);

        toast.success('Ticket closed');

        refetchTicket();
    }

    console.log(notes);

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        e.persist();

        setNoteText(e.target.value);
    }

    const handleNoteSubmit = () => {
        console.log(noteText)
    }

    const handleModalClose = () => {
        setNoteModal(false);
        setNoteText('');
    }

    if (isNotesLoading) {
        return <div>...</div>
    }

  return (
    <Container>
        <section className='lg:w-3/5 w-full mx-auto'>
            <Modal title="Add Note" show={noteModal} handleClose={handleModalClose}>
                <div>
                    <Textarea 
                        name="text"
                        label="Text"
                        placeholder='Write your note here'
                        value={noteText}
                        onChange={handleNoteChange}
                        required={true}
                    />

                    <div className='w-full'>
                        <Button onClick={handleNoteSubmit} className='float-right'>
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>    
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
                <h3 className='text-left font-semibold text-md'>Date submitted: { !isTicketLoading && new Date(ticket.createdAt).toLocaleString('en-US') }</h3>
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

            <section className='my-6'>
                <h2 className='font-bold text-xl flex justify-between gap-2 align-baseline'>
                    <span className='p-1'>Notes</span>
                    <Button onClick={() => setNoteModal(true)}>
                      <span className='flex items-center gap-2'><FaPlus />  Add Note</span>
                    </Button>
                </h2>
                { notes.items?.map((note: any, idx: number) => {
                return <NoteItem key={idx + Math.random()} note={note} />
              })}
            </section>

            {
                ticket.status !== 'closed' &&
                <Button className='w-full' variant='danger' onClick={() => closeTicket()}>Close Ticket</Button>
            }
        </section>
    </Container>
  )
}

export default Ticket