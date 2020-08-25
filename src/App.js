import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales) {
  citasIniciales = [];
}


  //Arreglo de citas programadas

  const [ citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realicar ciertas operaciones cdo el state cambie
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      if(citasIniciales) {
        localStorage.setItem('citas',JSON.stringify(citas))
      } else {
        localStorage.setItem('citas',JSON.stringify([]));
      }
  }, [citas]);



  // Función que tomes las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Función que elimina una cita por su id

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id) // elimina el id y trae los distitnos al solicitado
    guardarCitas(nuevasCitas); //guarda el arreglo modificado en Citas
  }


  // Título condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />

            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
