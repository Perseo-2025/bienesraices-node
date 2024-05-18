import { check, validationResult } from "express-validator"
import Usuario from "../models/usuario.js"
import { generarId } from "../helpers/token.js" 

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Login'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}
const registrar = async (req, res) =>{
    // valdiacion
    await check('nombre').notEmpty().withMessage('Campo vacío').run(req)
    await check('email').isEmail().withMessage('Email no válido').run(req)
    await check('password').isLength({min:6}).withMessage('El Password debe ser al menos 6 caracteres').run(req)  
    await check('repetir_password').equals(req.body.password).withMessage('El Password no coinciden').run(req)  
    
    console.log(req.body)
    let resultado = validationResult(req)

    //return res.json(resultado.array())
    // Verificar que el resultado este vacío
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                   
            }
        })
    }

    const {nombre, email, password} = req.body

    //Verificar que el usuario no este duplciado

    const existeUsuario =  await Usuario.findOne( {where:{email}} )   
    
    if(existeUsuario){
        
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El Usuario ya está Registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                   
            }
        })
    }

    // Almacenar un usuario
    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })


    //Mostrar un mensaje de condfirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos Enviado un Email de Confirmación, presiona en el enlace'

    })

}   



const formularioOlvidePassword = (req, res) => {
    res.render('auth/restaurar-password', {
        pagina: 'Recuperar Password'
    })
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}