import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

import Platillos from "./pages/Platillos"
import AgregarPlato from "./pages/AgregarPlato";
import ActualizarPlato from "./pages/ActualizarPlato";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Platillos/>} />
          <Route path="/add" element={<AgregarPlato/>} />
          <Route path="/update/:id" element={<ActualizarPlato/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
