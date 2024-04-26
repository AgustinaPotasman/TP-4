import express from "express";
import cors from "cors";
import arrayProvincias from "./src/controllers/province-controller.js"


const app = express();
const port = 3000; 
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.


app.get("/api/province" , (req, res) =>{
    res.status(200).send(arrayProvincias)
});

app.get("/api/province/:id" , (req, res) => {
    const id = req.params.id;
    for (let i = 0; i <= arrayProvincias.arrayProvincias.length; i++) {
            if (arrayProvincias.arrayProvincias[i].id == id) {
                res.status(200).json(arrayProvincias.arrayProvincias[i])
            } 
    }
    
});

app.post("/api/province",  (req, res) => 
{
        // Extraer datos del cuerpo de la solicitud
        const { nombre, nombreCompleto, latitud, longitud, ordenVisualizacion } = req.body;
    
        // Validar datos
        if (!nombre || !nombreCompleto || nombre.length < 3) {
             res.status(400).send("Error: El nombre debe tener al menos 3 caracteres y no puede estar vacío");
        }
    
        // Crear nueva provincia
        const nuevaProvincia = {
            nombre,
            nombreCompleto,
            latitud,
            longitud,
            ordenVisualizacion
        };
    
        // Agregar la nueva provincia al array de provincias
        arrayProvincias.arrayProvincias.push(nuevaProvincia);
    
        // Retornar status 201 (Created)
        res.status(201).send("Provincia creada correctamente");
});

app.put("/api/province", (req, res) => 
{
    const { id, nombre, nombreCompleto, latitud, longitud, ordenVisualizacion } = req.body;
    if (!nombre || nombre.length < 3) {
        return res.status(400).send("El nombre de la provincia debe tener al menos 3 caracteres.");
    }
    let provinciaEncontrada = false;
    for (let i = 0; i <= arrayProvincias.arrayProvincias.length; i++) {
        if (arrayProvincias.arrayProvincias[i].id == id) {
            arrayProvincias.arrayProvincias[i].nombre = nombre;
            arrayProvincias.arrayProvincias[i].nombreCompleto = nombreCompleto;
            provinciaEncontrada = true;
            res.status(201).send("Modificado");
        } 
        if (!provinciaEncontrada) {
            return res.status(404).send("No se encontró ninguna provincia con ese ID.");
        }
    }
})

app.delete("/api/province/:id", (req, res) => {
    const id = req.params.id;
    let index=-1;
    for (let i = 0; i <= arrayProvincias.arrayProvincias.length; i++) {
        if (arrayProvincias.arrayProvincias[i].id == id) {
            index = i;
        }
        } 
        if (index !== -1) {
            arrayProvincias.arrayProvincias.splice(index, 1);
            res.status(200).json({ message: "Provincia eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Provincia no encontrada" });
        } 

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
