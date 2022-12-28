import React from 'react'
import { useAppSelector } from '../hooks/redux'
import Card from './shared/Card';

const NoteItem = ({ note }: { note: Record<string, string>}) => {
    const { user } = useAppSelector((state) => state.auth);

  return (
    <Card className='p-2 border border-gray-100' style={{
        backgroundColor: note.isStaff ? 'rgb(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : "#000"
    }}>
        <div className='px-4'>
            <section className='flex flex-row flex-wrap justify-between'>
                <h4 className='font-bold'>Note from {note.isStaff ? <span>Staff</span>: <span>{user.first_name}</span>}</h4> 
                <div>
                    {new Date(note.createdAt).toLocaleString('en-US')}
                </div>
            </section>
            <p>{note.text}</p>
        </div>
    </Card>
  )
}

export default NoteItem