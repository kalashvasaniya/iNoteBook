import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)


    // Get all notes
    const getNotes = async () => {

        // API calll
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }


    // Add a note
    const addNote = async (title, description, tag) => {

        // API calll
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        window.location.reload()
    }


    // Delete a note
    const deleteNote = async (id) => {

        // API calll
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);


        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }


    // Edit a note
    const editNote = async (id, title, description, tag) => {

        // API calll
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);


        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;