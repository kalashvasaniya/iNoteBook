import React from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import contextValue from '../context/notes/noteContext'

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(contextValue)
    const { notes, getNotes, editNote } = context

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate("/login")
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("Updating the note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <>
            <AddNote />

            {/* Edit Button */}
            <div className="mx-28 md:mx-0">
                <button ref={ref} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="hidden" type="button">
                    Toggle modal
                </button>

                <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="px-10 fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative rounded-lg shadow bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-white">Edit your note</h3>
                                <form>
                                    <div className="mb-6">
                                        <label htmlFor="etitle" className="block mb-2 text-sm font-medium text-white">Title</label>
                                        <input onChange={onChange} value={note.etitle} type="text" id="etitle" name='etitle' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter title" required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="edescription" className="block mb-2 text-sm font-medium text-white">Description</label>
                                        <input onChange={onChange} value={note.edescription} type="text" id="edescription" name='edescription' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Description" required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="etag" className="block mb-2 text-sm font-medium text-white">Tag</label>
                                        <input onChange={onChange} value={note.etag} type="text" id="etag" name='etag' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter tag" required />
                                    </div>
                                    <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} ref={refClose} type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Note</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-white px-8 md:px-24 py-12 space-y-10 border-white ring ring-gray-600 rounded-lg m-10 md:mx-40">
                <div className="flex justify-center items-center text-center px text-xl underline-offset-4 underline decoration-gray-300 text-red-500">
                    Your Notes
                </div>
                <div className="flex justify-center">
                    {notes.length === 0 && 'Add notes to display'}
                </div>
                {Array.isArray(note) && notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
