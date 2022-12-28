import React from 'react'
import Card from './Card'

const Modal = ({ show, children, title, handleClose }: { show: any, children: JSX.Element, title: string, handleClose: () => void }) => {
    const display = show ? "block": "hidden"
  return (
        <Card aria-hidden="true" className={`${display} bg-gray-100 border fixed top-40 left-8 lg:top-[20rem] lg:left-[40rem] z-50 p-4 w-auto min-w-4/5 lg:min-w-[30rem] shadow-lg transition duration-300 ease-in-out`}>
            <div className="relative">
                <div className="relative flex flex-row justify-between py-2">
                    <h3 className="text-xl font-medium text-gray-90 px-6">
                        {title}
                    </h3>
                    <button type="button" onClick={() => handleClose()} className="absolute top-1 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <hr />
                </div>
                <div className="px-6 py-6 lg:px-8">
                    {children}
                </div>
            </div>
        </Card>
  )
}

export default Modal