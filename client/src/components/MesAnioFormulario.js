import React, { useState } from 'react';

const MesAnioFormulario = ({SetSearch}) => {
  const [mes, setMes] = useState(1);
  const [anio, setAnio] = useState(2020);

  const obtenerDatos = () => {
    if (validarMesYAnio()) {
      console.log('Mes seleccionado:', mes);
      console.log('Año seleccionado:', anio);
      SetSearch({
        anio:anio,
        mes: mes
      });
      // Puedes realizar acciones adicionales con los datos obtenidos
    }
  };

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

  return (
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



      <button  id="btn-listar" type="button" onClick={obtenerDatos}>
        Obtener Datos
      </button>
    </div>
  );
};

export default MesAnioFormulario;

