import  express from 'express'
import { inicio,categoria,noEncontrado,buscador, credito } from '../controllers/appController.js'

const router = express.Router()

//Página de inicio
router.get('/', inicio)

// Categorias
router.get('/categoria/:id', categoria)

//ruta para renderizar la página de simulación

router.get('/simulacion-credito-hipotecario', (req, res) => {
    res.render('credito', {
      pagina: 'Simulación de Crédito Hipotecario',
      csrfToken: req.csrfToken(),
    });
  })

  //ruta para procesar la simulación de c´redito hipotecario
  router.post('/simulacion-credito-hipotecario', credito)


//Página 404
router.get('/404', noEncontrado)

//Buscador
router.post('/buscador', buscador)

export default router