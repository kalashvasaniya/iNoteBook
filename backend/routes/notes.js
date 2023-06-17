const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// ROUTE 1 : get all the notes using : GET 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// ROUTE 2 : add a new note using : POST
router.post('/addnote', fetchuser,

    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    ],

    async (req, res) => {
        try {


            // destructuring
            const { title, description, tag } = req.body;

            // if there are error, return bad request or error!
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.status(400).json({
                    error: error.array()
                });
            }

            // create a new note
            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            // save the note
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }
    })

// ROUTE 3 : update an existing note using : PUT login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        // destructuring
        const { title, description, tag } = req.body;

        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


// ROUTE 4 : delete an existing note using : DELETE login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion if user owns this notes

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


module.exports = router