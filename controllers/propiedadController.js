import {unlink} from 'node:fs/promises'
import {validationResult} from 'express-validator';
import {Precio, Categoria, Propiedad} from "../models/index.js"


const admin = async (req, res) => {

    const {id} = req.usuario

    const propiedades = await Propiedad.findAll({
        where: {usuarioId: id },
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio' }
        ]
    })
    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        barra: true,
        propiedades,
        csrfToken: req.csrfToken(),
    })
}

//Formulario sobre crear una propiedad
const crear = async (req, res) => {
    //Consulta el Modelo de Precio y Categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos:{}
    })
}
const guardar = async (req, res) => {
    //Valdiacion
    let resultado = validationResult(req)
    console.log('guardando ', resultado)

    if(!resultado.isEmpty()){
        //Consultar el modelo de precios y categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Crear un registro
    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng,precio,categoria} = req.body
    
    const {id: usuarioId} = req.usuario
    
    try {
        const propiedadGuardado =  await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,    
            wc,
            calle,
            lat,
            lng,
            precioId:precio,
            categoriaId: categoria,
            usuarioId,
            imagen: ''
        })

        const { id } =propiedadGuardado
        res.redirect(`/propiedades/agregar-imagen/${id}`)
        
    } catch (error) {
        console.log(error)
    }
}

const agregarImagen = async (req, res) =>{

    const {id} = req.params

    // Validar que la propiedad existe
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    // Validar  que la propiedad no esté publicado
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedad pertenece a quien visite esta página
    if(  req.usuario.id.toString() !== propiedad.usuarioId.toString() ){
        return res.redirect('/mis-propiedades')
    }

    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad  
    })
}

const almacenarImagen = async(req, res, next) =>{
    const {id} = req.params

    // Validar que la propiedad existe
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    // Validar  que la propiedad no esté publicado
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedad pertenece a quien visite esta página
    if(  req.usuario.id.toString() !== propiedad.usuarioId.toString() ){
        return res.redirect('/mis-propiedades')
    }

    try {
        console.log(req.file)

        //almacenar la imagen y publicar la propiedad
        propiedad.imagen = req.file.filename
        propiedad.publicado = 1

        await propiedad.save()

        //res.redirect('/mis-propiedades')
        next()
    } catch (error) {
        console.log(error)
    }

}
const editar = async(req, res) => {

    const {id} = req.params

    //validar que la propieda exista
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    // Revisar que quien vista la url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }
    //Consulta el Modelo de Precio y Categoria
     const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/editar', {
        pagina:  ` Editar Propiedad: ${propiedad.titulo} ` ,
        barra: true,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos:propiedad
    })
}
const guardarCambios = async(req, res) => {

    //verificar la validacion
    let resultado = validationResult(req)
    console.log('guardando ', resultado)

    if(!resultado.isEmpty()){
        //Consultar el modelo de precios y categorias
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/editar', {
            pagina:  ` Editar Propiedad ` ,
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos:req.body
        })
    }

    const {id} = req.params

    //validar que la propieda exista
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    // Revisar que quien vista la url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }
    // Reescribir el    Objeto y Actualizarlo
    try {
        const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng,precio:precioId,categoria:categoriaId} = req.body
        
        propiedad.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })

        await propiedad.save();

        res.redirect('/mis-propiedades')

    } catch (error) {
        console.log('Oye hdpt hay un Error en:', error)
    }
}

const eliminar =async (req, res) => {
    
    const {id} = req.params

    //validar que la propieda exista
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    // Revisar que quien vista la url es quien creo la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    //Eliminar la Imagen asociada
    await unlink(`public/uploads/${propiedad.imagen}`)
    console.log( `Se eliminó la imagen correctamente: ${propiedad.imagen}` )

    // Eliminar la propiedad
    await propiedad.destroy()
    res.redirect('/mis-propiedades')
}

//Muestra una propiedad
const mostrarPropiedad = async(req, res) => {

    res.render('propiedades/mostrar', {
        
    })


}
export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad,
}