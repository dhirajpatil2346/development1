import React from 'react'
import { useEffect, useContext, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import NoteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {

    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        props.showAlert("Updated successfully", "success");
    }

    const handleClick = (e) => {
        console.log("updating a note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setnote({etitle:"", edescription:"", etag:""});
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/*<!-- Button trigger modal -->*/}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/*<!-- Modal -->*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group my-3">
                                    <label htmlFor="title">title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} aria-describedby="emailHelp" name="etitle" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="description">description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="tag">tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"  onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3 row'>
                <h1 className='my-3'>Your Notes</h1>
                <div className="container mx-2">
                    {(notes.length === 0) && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes