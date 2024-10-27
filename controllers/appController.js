import { Sequelize } from "sequelize"
import { Precio, Categoria, Propiedad } from "../models/index.js"

const inicio = async(req, res) => {


    const  [categorias , precios, casas, departamentos] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where:{
                categoriaId: 1
            },
            include:[
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order:[
                ['createdAt','DESC']
            ]
        }),
        Propiedad.findAll({
            limit: 3,
            where:{
                categoriaId: 2
            },
            include:[
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order:[
                ['createdAt','DESC']
            ]
        })
    ])

    console.log('AQUI LAS PROPIEDADES: ',categoria)

    res.render('inicio', {
        pagina:'Inicio',
        categorias,
        precios,
        casas,
        departamentos,
        csrfToken: req.csrfToken()   
    })
}
const categoria = async(req, res) => {
    const {id} = req.params

    //Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id)

    if(!categoria){
        return res.redirect('/404')
    }

    //Obtener las propiedades
    const propiedades = await Propiedad.findAll({
        where:{
            categoriaId: id
        },
        include:[
            {model:Precio, as: 'precio'}
        ]
    })

    res.render('categoria', {
        pagina:  `${categoria.nombre}s en Venta`,
        propiedades,
        csrfToken: req.csrfToken()   
    })

}
const credito = (req, res) => {

    const { amountInmueble, porcentageInmueble, tea, plazoMeses } = req.body;

  // Validación de los datos ingresados
  if (!amountInmueble || !porcentageInmueble || !tea || !plazoMeses) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const totalInicialInmueble = amountInmueble * porcentageInmueble;
  const totalMontoCapital = amountInmueble - totalInicialInmueble;
  const tem = Math.pow(1 + parseFloat(tea), 1 / 12) - 1;
  const pagoMensual = (totalMontoCapital * tem) / (1 - Math.pow(1 + tem, -parseInt(plazoMeses)));

  // Devuelve JSON para manejar en el cliente
  res.json({
    totalInicialInmueble: totalInicialInmueble.toFixed(2),
    totalMontoCapital: totalMontoCapital.toFixed(2),
    tem: tem.toFixed(6),
    pagoMensual: pagoMensual.toFixed(2),
    csrfToken: req.csrfToken(),
  });
}

const noEncontrado = (req, res) => {
    res.render('404',{
        pagina: 'No encontrada',
        csrfToken: req.csrfToken()   
    })
}
const buscador = async (req, res) => {
    const {termino} = req.body

    // validar que el termino no esté vacío
    if(!termino.trim()){
        return res.redirect('back')
    }

    //Consultar las propiedades
    const propiedades = await Propiedad.findAll({
        where:{
            titulo:{
                [Sequelize.Op.like] : '%' + termino + '%' //buscando un termino en cualquier lugar
            },
        },
        include:[
            { model: Precio, as: 'precio' }
        ]
    })
    
    res.render('busqueda',{
        pagina: 'Resultados de la Busqueda',
        propiedades,
        csrfToken: req.csrfToken() ,
        
    })
}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador,
    credito
}