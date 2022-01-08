import {React, useState} from "react";
import Note from "./Note";
import axios from "axios";

const Notes= ({notes, setNotes})=>{
    const [error, setError] = useState({
        'title': '',
        'body': ''
    });

    const deleteNote= (id, e)=>{
        e.preventDefault();
        
        axios.delete(`http://localhost/notes-api-ci4/public/notes/delete/${id}`)
            .then((payload)=>{
                alert(payload.data.message);
                setNotes(notes.filter(note=> id !== note.id)); // filter similar a map pero a este se piede aplicar una condicion
            })
            .catch((error)=>{
                alert(error.response);
            })
    }

    const updateNote= (newNote)=>{
        console.log(newNote);
        let response = axios.put(`http://localhost/notes-api-ci4/public/notes/update/${newNote.id}`, newNote)
            .then((payload)=>{
                console.log(payload.data.data);
                let {id} = payload.data.data;
                setNotes(
                    notes.map(note=> note.id === id? payload.data.data: note)
                ); //muta la informacion principal si es que existen cambios
                    return true;
            })
            .catch((errors)=>{
                console.log(errors);
                setError(errors.response.data.messages);
                return false;
            })
        return response;
    }

    return(
        (notes.length>0)?
            <div className="columns is-multiline">
                {
                    notes.map(note=> {
                        return <Note key={note.id} note={note} updateNote={updateNote} setError={setError} error={error} deleteNote={deleteNote}></Note>
                    })
                }
            </div>
        : <p className="has-text-centered subtitle">No existen notas</p>
    );
}

export default Notes;