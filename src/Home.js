import {React, useState, useEffect} from "react";

import Form from "./components/Form"; //Componente personalizado
import Notes from "./components/Notes"; //Componente personalizado
import axios from "axios"; //importa libreia para promesas http

function Dashboard(){
    useEffect(()=>{
        axios.get('http://localhost/notes-api-ci4/public/notes')
            .then((payload)=>{
                console.log(payload);
                setNotes(payload.data);
            })
            .catch((error)=>{
                console.log(error);
            }); //Esto es una promesa de axios
    }, []); //Se ejecuta despues d eque se ha cargado el DOM y con corchetes indicamos que se ejecute una vez

    const [notes, setNotes] = useState([]); // hook useState con array como estado inicial

    return(
        <div className="container">
            <h1 className="title has-text-centered mt-5">Listado de notas</h1>
            <Notes notes={notes} setNotes={setNotes}></Notes> {/* Llamamos componente personalizado y pasamos el estado de notas como props */}

            <Form notes={notes} setNotes={setNotes}></Form> {/* Llamamos componente personalizado y pasamos el estado de notas como props */}
        </div>
    )
}

export default Dashboard;