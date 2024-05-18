import express from "express"
import { formularioLogin, formularioRegistro, formularioOlvidePassword, registrar } from "../controllers/usuarioController.js";

const router = express.Router()

// Routing
router.get('/login', formularioLogin );

router.get('/registro', formularioRegistro );
router.post('/registro', registrar );


router.get('/restaurar-password', formularioOlvidePassword );

export default router
//Grupo de Rutas    
// router.route('/')
//     .get((req, res) => {
//         res.json({msg: "Hola mundo"})
//     })
//     .post((req, res) => {
//         res.json({msg: "Respuesta tipo post"})
//     })
