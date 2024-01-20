import axios from 'axios';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalEdit=({item})=> {
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [formData, setFormData] = useState({
    id: item.id,
    date: item.date || '',
    description: item.description || '',
    price: item.price || '',
    type: item.type || '',
  });

  const [errors, setErrors] = useState({
    type: '',
    date: '',
    description: '',
    price: '',
  });




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = (e) => {
    // Realiza acciones 
     e.preventDefault();
    // Realizar validaciones aquí antes de enviar los datos
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
      console.log(errors);
    } else {
      axios.put("http://localhost:3001/update",{
        id:formData.id,
        type: formData.type,
        date: formData.date,
        description: formData.description,
        price: formData.price
      }).then(()=>{
       
       
        alert("Flete modificado");
      });
      
     
      // Enviar los datos o realizar otras acciones
      console.log('Datos a modificar:', formData);
    }
  
  
    handleClose();
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Flete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="number"
              name="id"
              placeholder={formData.id}
              value={formData.id}
              readOnly  // El campo id es de solo lectura
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder={formData.date}

              value={formData.date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder={formData.description}
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder={formData.price}
              value={formData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              placeholder={formData.type}
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="ingreso">Ingresos</option>
              <option value="gasto">Gastos</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default ModalEdit;