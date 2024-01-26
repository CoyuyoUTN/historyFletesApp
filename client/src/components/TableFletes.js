import axios from "axios";
import { useState } from "react";
import ModalForm from "./ModalForm";





const TableFletes = () =>{
const [fletesList, setFletesList]= useState([]);
const [mes, setMes] = useState(1);
  const [anio, setAnio] = useState(2020);




  const validarMesYAnio = () => {
    const mesValido = mes >= 1 && mes <= 12;
    const anioValido = anio >= 2020; // Establece el año mínimo según tus necesidades

    if (!mesValido) {
      alert('Por favor, ingresa un mes válido (entre 1 y 12).');
    }

    if (!anioValido) {
      alert('Por favor, ingresa un año válido (mayor o igual a 2020).');
    }

    return mesValido && anioValido;
  };

const getFletes=()=>{

  if (validarMesYAnio()) {
    console.log('Mes seleccionado:', mes);
    console.log('Año seleccionado:', anio);
 
    axios.get(`http://localhost:3001/fletes?mes=${mes}&anio=${anio}`)
    .then(response => {
      // Manejar la respuesta del servidor
      console.log('Respuesta del servidor:', response.data);
      // Aquí puedes actualizar tu estado de React u otra lógica de frontend
      setFletesList(response.data);
    })
    .catch(error => {
      // Manejar errores en la solicitud
      console.error('Error en la solicitud al servidor:', error);
    });
  }
  
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

<div className=''>
  <div className="container-buttons-listar">
      
      <div className="form-container">
      <label htmlFor="mes">Mes:</label>
      <input
        type="number"
        id="mes"
        name="mes"
        value={mes}
        min={1}
        max={12}
        onChange={(e) => setMes(parseInt(e.target.value, 10))}
      />

      <label htmlFor="anio">Año:</label>
      <input
        type="number"
        id="anio"
        name="anio"
        value={anio}
        min={2020}
        onChange={(e) => setAnio(parseInt(e.target.value, 10))}
      />



      <button  id="btn-listar" type="button" onClick={getFletes}>
        Obtener Datos
      </button>
    </div>
  </div>
  <div className="lista">
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
          {fletesList.filter(item => item.type.toLowerCase() === 'ingreso').map((item, index) => (
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
          {fletesList.filter(item => item.type.toLowerCase() === 'gasto').map((item, index) => (
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
      
    </div>
    </div>
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
)
}

export default TableFletes;