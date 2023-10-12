import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "password",
  database: "test"
})

app.use(express.json());
app.use(cors())

app.get("/platillos", (req, res) => {
  const q = "SELECT * FROM platillos"
  db.query(q, (err, data) => {
    if(err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
      
  })
})

app.get("/platillos/:id", (req, res) => {
  const platilloId  = req.params.id;
  const q = "SELECT * FROM  platillos WHERE id = ?"

  db.query(q, [platilloId], (err, data) => {
      if(err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
  })
});

app.get("/platillos/nombre/:nombre", (req, res) => {
    const nombre  = req.params.nombre;
    const q = "SELECT * FROM  platillos WHERE nombre = ?"

    db.query(q, [nombre], (err, data) => {
        if(err) {
          return res.json(err)
        } else {
          return res.json(data)
        }
    })
});

app.post("/platillos", (req, res) => {
  const q = "INSERT INTO platillos (`nombre`, `precio`, `detalles`) VALUES (?)";
  
  const values = [
    req.body.nombre,
    req.body.precio,
    req.body.detalles
  ];
  
  db.query(q, [values], (err, data) => {
    if(err) {
      return res.json(err)
    } else {
      return res.json("Platillo creado!")
    }
      
  })
})

app.delete("/platillos/:id", (req, res) => {
  const platilloId = req.params.id;
  const q = "DELETE from platillos WHERE id = ?"

  db.query(q, [platilloId], (err, data) => {
    if(err) {
      return res.json(err)
    } else {
      return res.json("Platillo eliminado!")
    }
  })
})

app.put("/platillos/:id", (req, res) => {
  const platilloId = req.params.id;
  const q = "UPDATE platillos SET `nombre` = ?, `precio` = ?, `detalles` = ? WHERE id = ?"

  const values = [
    req.body.nombre,
    req.body.precio,
    req.body.detalles
  ];

  db.query(q, [...values, platilloId], (err, data) => {
    if(err) {
      return res.json(err)
    } else {
      return res.json("Platillo actualizado!")
    }
  })
})

app.listen(8800, () => {
  console.log("Connected to backend!");
})