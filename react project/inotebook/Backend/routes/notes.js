const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../modules/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "internal server error" });
    }
})

// ROUTE 2: add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note(
            {
                title, description, tag, user: req.user.id
            }
        )
        const saveNote = await note.save();

        res.json(saveNote);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "internal server error" });
    }
})

// ROUTE 3: update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // create new Note object
    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await  Note.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() != req.user.id)
    {
        return res.status(401).send("Not Allowed!");
    }
    
    note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});
})

// ROUTE 4: delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    // find the note to be deleted and delete it
    let note = await  Note.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found");
    }

    // allow deletion only if user owns this note
    if(note.user.toString() != req.user.id)
    {
        return res.status(401).send("Not Allowed!");
    }
    
    note  = await Note.findByIdAndDelete(req.params.id);
    res.json({"success" : "Note has been deleted"});
})
module.exports = router;