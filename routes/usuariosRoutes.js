import express from "express"
import { formularioLogin, cerrarSesión, formularioRegistro, 
        formularioOlvidePassword, registrar, 
        comprobar, resetPassword, comprobarToken, 
        nuevoPassword, autenticar } from "../controllers/usuarioController.js";

const router = express.Router()

// Routing
router.get('/login', formularioLogin );
router.post('/login', autenticar );

//Cerrando Sesion
router.post('/cerrar-sesion', cerrarSesión)

router.get('/registro', formularioRegistro );
router.post('/registro', registrar );

router.get('/confirmar/:token', comprobar );

router.get('/restaurar-password', formularioOlvidePassword );
router.post('/restaurar-password', resetPassword );

//Almacena el nuevo password
router.get('/restaurar-password/:token', comprobarToken )
router.post('/restaurar-password/:token', nuevoPassword )


export default router
//Grupo de Rutas    
// router.route('/')
//     .get((req, res) => {
//         res.json({msg: "Hola mundo"})
//     })
//     .post((req, res) => {
//         res.json({msg: "Respuesta tipo post"})
//     })
