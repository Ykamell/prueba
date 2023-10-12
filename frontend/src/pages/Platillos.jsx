import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


import axios from "axios"

const Platillos = () => {
  const [platillos, setPlatillos] = useState([])
  const [nombre, setNombre] = useState("")
  const [platillo, setPlatillo] = useState()

  useEffect(() => {
    const fetchPlatillos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/platillos")
        setPlatillos(res.data);
      } catch (err) {
        console.log(err)
      }
    }

    fetchPlatillos()
  }, [])

    const handleSearch = async e => {
        console.log(nombre)
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:8800/platillos/nombre/${nombre}`)
            console.log(res)
            setPlatillo(res.data[0]);
        } catch (err) {
            console.log(err)
        }   
    }

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/platillos/${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setNombre(e.target.value);
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

      <div className="page-container">
        <div className="btn-search-container">
            <Form className="search-platillo">
                <Form.Control placeholder="Buscar plato por nombre" onChange={handleChange}/>
                <Button variant="primary" type="submit" className="search-btn" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            </Form>
            <Button variant="primary" className="add-btn" onClick={() => navigate("/add")}><FontAwesomeIcon icon={faPlus} /></Button>
        </div>

        <Table striped bordered hover variant="dark" className="platillos">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Detalles</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody> 
                { platillo? (
                    <tr>
                        <td>{platillo.id}</td>
                        <td>{platillo.nombre}</td>
                        <td>{platillo.precio}</td>
                        <td>{platillo.detalles}</td>
                        <td>
                            <Button variant="primary" className="edit-btn" onClick={() => navigate(`/update/${platillo.id}`)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                            <Button variant="primary" className="delete-btn" onClick={() => handleDelete(platillo.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </td>
                    </tr>
                    ) : (
                        platillos.map(plato => (
                        <tr>
                            <td>{plato.id}</td>
                            <td>{plato.nombre}</td>
                            <td>{plato.precio}</td>
                            <td>{plato.detalles}</td>
                            <td>
                            <Button variant="primary" className="edit-btn" onClick={() => navigate(`/update/${plato.id}`)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                            <Button variant="primary" className="delete-btn" onClick={() => handleDelete(plato.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                            </td>
                        </tr>
                        ))
                    )
                } 
            </tbody>
        </Table>
      </div>
    </>
  )
}

export default Platillos