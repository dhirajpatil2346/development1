import React from 'react'
import NoteContext from '../context/notes/noteContext';
import { useContext } from 'react';
import { useState } from 'react';
function AddNote(props) {
    const context = useContext(NoteContext);
	const {  addNote } = context;
    const [note, setnote] = useState({title:"",description : "", tag:""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title="", note.description="", note.tag="");
        props.showAlert("Note added successfully", "success");
    }
    const onchange = (e)=>{
        setnote({...note, [e.target.name] : e.target.value});
    }
    return (
        <div>
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" value={note.title} onChange = {onchange}  minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange = {onchange} value={note.description}  minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange = {onchange}  value={note.tag} minLength={5} required/>
                </div>
                <button disabled={(note.title.length <5 || note.description.length<5)} type="submit" className="btn btn-primary my-3" onClick = {handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote