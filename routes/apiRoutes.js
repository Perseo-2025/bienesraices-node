import express from 'express'
import { propiedades } from '../controllers/apiController.js'


const router = express.Router()

router.get('/propiedades', propiedades) //consultando la api

export default router