import React, { useState, useEffect } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    useEffect(() => {
        // Fetch notes when the component mounts
        getNotes();
    }, []);

    // Get all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const note = await response.json();
            setNotes([...notes, note]);
            window.location.reload();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            // Update the note in the local state
            const updatedNotes = notes.map((note) => {
                if (note._id === id) {
                    return { ...note, title, description, tag };
                }
                return note;
            });
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
