import axios from "axios";
import { useState } from "react";
import ModalForm from "./ModalForm";
import MesAnioFormulario from "./MesAnioFormulario";




const TableFletes = () =>{
const [fletesList, setFletesList]= useState([]);
const [search, SetSearch]= useState({
  anio:0,
  mes:0
});



const getFletes=()=>{


    axios.get("http://localhost:3001/fletes").then((response)=>{
      setFletesList(response.data);
    });
  }

 

  const deleteFlete = (id) => {
    const confirmacion = window.confirm('¿Seguro que desea eliminar este elemento?');

    if (confirmacion) {
      axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
          getFletes();
        })
        .catch((error) => {
          console.error('Error al eliminar el elemento:', error);
        });
    } else {
      // El usuario canceló la eliminación, puedes hacer algo si es necesario
      console.log('Eliminación cancelada por el usuario');
    }
  };
  
function sumarGanancias(arr) {
  return arr
    .filter(objeto => objeto.hasOwnProperty('price') && typeof objeto.price === 'number' && objeto.price > 0)
    .map(objeto => objeto.price)
    .reduce((suma, precio) => suma + precio, 0);
}

function sumarGastos(arr) {
  return arr
    .filter(objeto => objeto.hasOwnProperty('price') && typeof objeto.price === 'number' && objeto.price < 0)
    .map(objeto => objeto.price)
    .reduce((suma, precio) => suma + precio, 0);
}

function formatearFecha(fechaISO8601) {
  // Crear un objeto de fecha
  var fecha = new Date(fechaISO8601);

  // Obtener los componentes de la fecha
  var year = fecha.getFullYear();
  var month = fecha.getMonth() + 1; // ¡Recuerda que en JavaScript los meses van de 0 a 11!
  var day = fecha.getDate();

  // Formatear la fecha como "yyyy/mm/dd"
  var fechaFormateada = year + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;

  return fechaFormateada;
}

const ganancias = sumarGanancias(fletesList);
const gastos = sumarGastos(fletesList);
const total= ganancias+gastos;

return (

<div className='lista'>
  <div className="container-buttons-listar">
      <MesAnioFormulario SetSearch={SetSearch}/>
      <button id="btn-listar"  className="lista-btn-second" onClick={getFletes}>Listar Todo</button>
  </div>
      <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fletesList.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{formatearFecha(item.date)}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
              <ModalForm item={item} />
                <button type="button" className="btn btn-danger" onClick={()=>{deleteFlete(item.id)}}>Eliminar</button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="expense-table">
        <thead>
        <tr>
            <th>Ganancia</th>
            <th>Perdida</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ganancias}</td>
              <td>{gastos}</td>
              <td>{total}</td>
            </tr>
          </tbody>
      </table>
    </div>
    </div>
)
}

export default TableFletes;