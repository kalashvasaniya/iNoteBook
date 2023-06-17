import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import contextValue from '../context/notes/noteContext'


const AddNote = () => {
    const context = useContext(contextValue)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="text-white px-10 md:px-48 py-16 md:py-12 space-y-10 border-white ring ring-gray-600 rounded-lg m-10 md:mx-40">
                <div className="flex justify-center items-center text-center px text-xl underline-offset-4 underline decoration-gray-300 text-red-500">
                    Add a Note
                </div>

                <form>
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
                        <input onChange={onChange} type="text" id="title" name='title' value={note.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter title" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                        <input onChange={onChange} type="text" id="description" name='description' value={note.description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Description" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="tag" className="block mb-2 text-sm font-medium text-white">Tag</label>
                        <input onChange={onChange} type="text" id="tag" name='tag' value={note.tag} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter tag" required />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
