import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    ticket: Record<string, string>
}

const TicketItem: React.FC<Props> = ({ticket }) => {
    const STATUS: Record<string, string> = {
        new: 'bg-green-500 text-white',
    }
  return (
    <tr className='hover:bg-gray-100'>
        <td className='px-10 py-4'>{new Date(ticket.createdAt).toLocaleString('en-US')}</td>
        <td className='px-10 py-4'>{ticket.product}</td>
        <td className={`px-10 py-4`}><span className={`px-4 py-2 rounded-lg ${STATUS[`${ticket.status}`]}`}>{ticket.status}</span></td>

        <td className='px-10 py-4'><Link to={`/tickets/${ticket._id}`} className="hover:underline">View</Link></td>
    </tr>
  )
}

export default TicketItem