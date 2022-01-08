import {React, useState} from "react";

const Note= ({note, updateNote,deleteNote,setError,error})=>{
    const [modeEdit, setModeEdit] = useState(false);
    const [item, setItem] = useState(note);

    const toggle= (e)=>{
        e.preventDefault();
        setModeEdit(!modeEdit); //muta el estado
        setItem(note); //re establece el valor a lo que trae la prop note, esto en caso de clicar el boton de cancelar
        setError({'title': '', 'body': ''}); //Para que se quiten los errores
    }

    const edit= async(e)=>{ //espera la respuesta de una promesa por eso el async, de lo contrario no retornara el true/false
        e.preventDefault();

        if(await updateNote(item)){ //ejecuta la funcion que llega del padre como prop a este componente y manda la info y debe retornar true/false
            setModeEdit(false); //regresa el modo edicion a falso
            setError({'title': '', 'body': ''}); //Para que se quiten los errores
        }
    }

    return(
        <>
            <div className="column is-one-quarter">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">Id: {note.id}</p>
                    </header>
                    <div className="card-content">
                        {(modeEdit)?
                            <div className="field">
                                <label className="label" htmlFor="">Titulo</label>
                                <div className="control">
                                    <input className="input" type="text" value={item.title} onChange={(e)=> setItem({...item, title: e.target.value})}/>
                                </div>
                                <span className="help is-danger">{error.title}</span>
                            </div>
                            : <div>Titulo: {note.title}</div>
                        }
                        {(modeEdit)?
                            <div className="field">
                                <label className="label" htmlFor="">Cuerpo</label>
                                <div className="control">
                                    <textarea className="textarea" value={item.body} onChange={(e)=> setItem({...item, body: e.target.value})}></textarea>
                                </div>
                                <span className="help is-danger">{error.body}</span>
                            </div>
                            : <div>Cuerpo: {note.body}</div>
                        }
                    </div>
                    <footer className="card-footer">
                        <a href={'/'} className="card-footer-item" onClick={(e)=> toggle(e)}>{(modeEdit)? 'Cancelar': 'Editar'}</a>
                        {(modeEdit)?
                            <a href={'/'} className="card-footer-item" onClick={(e)=> edit(e)}>Guardar</a> /* si es false muestra el boton */
                         : <a href={'/'} className="card-footer-item" onClick={(e)=> deleteNote(note.id, e)}>Eliminar</a> /* si es true muestra el boton */
                        }
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Note;