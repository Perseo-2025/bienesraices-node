import express from 'express'
import usuarioRoutes from './routes/usuariosRoutes.js'

// Crear la app
const app = express()

app.use('/', usuarioRoutes)


// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log( `Server on Port ${port}`);
})