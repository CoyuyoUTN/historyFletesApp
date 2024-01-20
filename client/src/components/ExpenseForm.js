// ExpenseForm.js

import React, { useState } from 'react';
import Axios from "axios";



const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    type: '', // Valor predeterminado para 'Gasto'
    date: '',
    description: 'Flete',
    price: 0,
  });

  
  const [errors, setErrors] = useState({
    type: '',
    date: '',
    description: '',
    price: '',
  });





  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };


  const handleReset = () => {
    // Lógica para resetear el formulario
    setFormData({
      type: 'ingresos', // Valor predeterminado para 'Gasto'
    date: '',
    description: '',
    price: 0,
      // Resetear otros campos del formulario
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Realizar validaciones aquí antes de enviar los datos
    console.log('Datos a enviar:', formData.type);
    const newErrors = {};

    // Validación del tipo (Ingreso o Gasto)
    if (!formData.type) {
      newErrors.type = 'Selecciona un tipo (Ingreso o Gasto)';
    }

    // Validación de la fecha
    if (!formData.date) {
      newErrors.date = 'La fecha es obligatoria';
    }

    // Validación de la descripción
    if (!formData.description) {
      newErrors.description = 'La descripción es obligatoria';
    }

    // Validación del precio
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      newErrors.price = 'El precio es obligatorio y debe ser un número';
    }

    // Si hay errores, actualiza el estado de los errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      Axios.post("http://localhost:3001/create",{
        type: formData.type,
        date: formData.date,
        description: formData.description,
        price: formData.price
      }).then(()=>{
        alert("Flete registrado");
      });
      
      // Enviar los datos o realizar otras acciones
    
    }
  };



    
      

  return (
    
    <div className="expense-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo:</label>
          <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Gasto">Gasto</option>
                <option value="Ingreso">Ingreso</option>
          </select>
          <span className="error">{errors.type}</span>
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          
          />
          <span className="error">{errors.date}</span>
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
           
            onChange={handleChange}
          />
          <span className="error">{errors.description}</span>
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <span className="error">{errors.price}</span>
        </div>
      <div className='btn-div'>
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
      </form>
      </div>
   
  );
};

export default ExpenseForm;

