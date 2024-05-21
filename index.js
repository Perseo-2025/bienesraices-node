import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuariosRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'

import db from './config/db.js'

// Crear la app
const app = express()

//Hablitar la lectura para los datos del formulario
app.use( express.urlencoded({extended: true}))

// Habilitar Cookie Parser
app.use(cookieParser())

// Habilitar CSRF
app.use(csrf({cookie: true}))


//conexion a la bd
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion Correcta a la Base de Datos')
} catch (error) {
    console.log(error)
}


//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Pública (Identificando el tailwindcss)
app.use(express.static('public'))


//Routing
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)


// Definir un puerto y arrancar el proyecto
    const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log( `Server on Port ${port}`);
})