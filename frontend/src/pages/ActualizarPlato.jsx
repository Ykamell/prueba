import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ActualizarPlato = () => {
    const [platillo, setPlatillo] = useState()

    const [platilloAct, setPlatilloAct] = useState({
        nombre: "",
        precio: "",
        detalles: "",
    })

    const navigate = useNavigate();
    const location = useLocation()

    const id = (location.pathname.split("/")[2]);

    const handleChange = (e) => {

        setPlatilloAct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
        await axios.put("http://localhost:8800/platillos/" + id, platilloAct)
        navigate("/")
        } catch (err) {
        console.log(err)
        }
    }

    useEffect(() => {
        const fetchPlatillo = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/platillos/${id}`)
            console.log(res)
            setPlatillo(res.data[0]);
        } catch (err) {
            console.log(err)
        }
        }

        fetchPlatillo()
    }, [])

    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark" variant='dark'>
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
                <Card.Title>Actualizar Platillo</Card.Title>
                <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Nombre del Platillo</Form.Label>
                    <Form.Control onChange={handleChange} name="nombre" placeholder={platillo?.nombre}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio del Platillo</Form.Label>
                    <Form.Control type='number' name="precio" onChange={handleChange} placeholder={platillo?.precio}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Detalles del Platillo</Form.Label>
                    <Form.Control name="detalles" onChange={handleChange} placeholder={platillo?.detalles}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Actualizar
                </Button>
                </Form>
            </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default ActualizarPlato