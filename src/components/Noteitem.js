import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import contextValue from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(contextValue)
    const { deleteNote } = context

    const { note, updateNote } = props
    return (
        <>
            <div id="toast-message-cta" className="w-full p-4 text-gray-400 rounded-lg shadow bg-gray-800 " role="alert">
                <div className="flex">
                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-white">{note.title}</span>
                        <div className="mb-2 text-sm font-normal">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam adipisci alias vitae eum. Soluta accusantium</div>

                        <Link to="/" onClick={() => { updateNote(note) }} className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4">Edit</Link>

                        <Link to="/" onClick={() => { deleteNote(note._id) }} className="inline-flex px-2.5 py-1.5 text-xs ml-3 md:ml-4 font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4">Delete</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Noteitem
