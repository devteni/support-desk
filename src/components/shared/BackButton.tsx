import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = ({ url='' }: { url?: string}) => {
  return (
    <Link to={url} className="w-[8rem] flex gap-2 justify-center items-center border-2 border-gray-800 px-6 py-2 font-bold hover:scale-95">
        <FaArrowCircleLeft /> Back
    </Link>
  )
}

export default BackButton