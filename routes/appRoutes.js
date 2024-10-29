import  express from 'express'
import { inicio,categoria,noEncontrado,buscador, creditoh, crearCalculo } from '../controllers/appController.js'
import protegerRuta from '../middleware/protegerRuta.js'

const router = express.Router()

//Página de inicio
router.get('/', inicio)

// Categorias
router.get('/categoria/:id', categoria)

//ruta para renderizar la página de simulación

router.get('/simulacion-credito-hipotecario', protegerRuta, creditoh)

//ruta para procesar la simulación de c´redito hipotecario
router.post('/simulacion-credito-hipotecario', protegerRuta, crearCalculo)


//Página 404
router.get('/404', noEncontrado)

//Buscador
router.post('/buscador', buscador)

export default router