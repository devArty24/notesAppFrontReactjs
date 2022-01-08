import {React, useState} from "react";
import axios from "axios";

const Form= ({notes, setNotes})=>{ //Recibe props de componente padre, entre llaves se puede recibir como se manda de lo contrario en cada prop recibida deberas colocar props.nombrePropiedad
    const initialNotes = {id: "", title: "", body: ""};

    const [note, setNote] = useState(initialNotes);
    const [error, setError] = useState({'title': '', 'body': ''});

    const addNote= (ev)=>{
        ev.preventDefault(); // cancela recarga de pagina(formulario)

        axios.post('http://localhost/notes-api-ci4/public/notes/create', note)
            .then((payload)=>{
                console.log(payload);
                setNotes([...notes, payload.data.data]);
                setNote(initialNotes);
            })
            .catch((error)=>{
                console.log(error);
                setError(error.response.data.messages);
            })

        /* if(note.title.trim() === "" || note.body.trim() === ""){
            return;
        } // "valida" que no lleguen vacios

        setNotes([
            ...notes, {
                ...note, id: (notes.length>0)?Math.max(...notes.map(note=> note.id))+1 :1
            }
        ]); */ // muta estado de notes, utilizando spreed operator
    } //Cacha el onSubmit

    return(
        <div className="has-background-success-light p-3">
            <form onSubmit={(ev)=> addNote(ev)}>
                <div className="field">
                    <label className="label" htmlFor="title">Titulo</label>
                    <div className="control">
                        {/* Se muta  el estado de note y para no perder las dos claves del objeto inicial ocupamos el sprad operator*/}
                        <input className="input" id="title" type="text" value={note.title} onChange={(ev)=> setNote({...note, title:ev.target.value})}/>
                    </div>
                    <span className="help is-danger">{error.title}</span>
                </div>

                <div className="field">
                    <label className="label" htmlFor="body">Cuerpo</label>
                    <div className="control">
                        <textarea className="textarea" id="body" value={note.body} onChange={(ev)=> setNote({...note, body:ev.target.value})}></textarea>
                    </div>
                    <span className="help is-danger">{error.body}</span>
                </div>

                <button className="button is-primary">Agregar</button>
            </form>
        </div>
    );
}

export default Form;