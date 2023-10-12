import { useState } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const AgregarPlato = () => {
  const [platillo, setPlatillo] = useState({
    nombre: "",
    precio: "",
    detalles: "",
  })

  const navigate = useNavigate()
  const handleChange = (e) => {
    setPlatillo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  console.log(platillo)

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/platillos", platillo)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Restaurante Chino</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Platillos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='page-container'>
        <Card data-bs-theme="dark" bg="dark">
          <Card.Body>
            <Card.Title>Agregar Platillo</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Platillo</Form.Label>
                <Form.Control onChange={handleChange} name='nombre' />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Precio del Platillo</Form.Label>
                <Form.Control onChange={handleChange} type='number' name='precio' />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Detalles del Platillo</Form.Label>
                <Form.Control onChange={handleChange} name='detalles' />
              </Form.Group>
              <Button onClick={handleClick} variant="primary" type="submit">
                Añadir
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default AgregarPlato