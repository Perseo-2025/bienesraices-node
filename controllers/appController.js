import { Sequelize } from "sequelize"
import { Precio, Categoria, Propiedad } from "../models/index.js"
import Credito from "../models/Credito.js"
import { validationResult } from "express-validator";

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
        pagina:  `${categoria.nombre} en Venta`,
        propiedades,
        csrfToken: req.csrfToken()
    })

}

//agregar propiedades
const creditoh = async (req, res) => {
    const [ propiedades] = await Promise.all([
        Propiedad.findAll(),
      ]);

    res.render('credito', {
      pagina: 'Simulación de Crédito Hipotecario',
      csrfToken: req.csrfToken(),
      propiedades,
      datos: {},
    });
}

const crearCalculo = async (req, res) => {
    let resultado = validationResult(req);
    console.log("guardando ", resultado);

    if(!resultado.isEmpty()){
        const [ propiedades] = await Promise.all([
            Propiedad.findAll(),
        ]);
          
        return res.render('credito', {
            pagina: 'Simulación de Crédito Hipotecario',
            csrfToken: req.csrfToken(),
            propiedades,
            errores: resultado.array(),            
            datos: req.body,
        });
    }

    const {montoInmueble, cuotaInicialPorcentaje, TEA, plazoAnios, propiedad} = req.body;
    const { id: usuarioId } = req.usuario;
    

    const cuotaInicial = montoInmueble * cuotaInicialPorcentaje;
    const montoCapital = montoInmueble * (1 - cuotaInicialPorcentaje); 
    const TEAc = TEA/100;
    const TEMp = Math.pow((1 + TEAc), 1 / 12) - 1;
    const TEM = TEMp * 100 ;
    const plazoMeses = plazoAnios * 12;
    const pagoMensual = montoCapital * (TEMp / (1 - Math.pow(1 + TEMp, -plazoMeses)));

    try {
        const creditoGuardado = await Credito.create({
            montoInmueble,
            cuotaInicialPorcentaje,
            TEA,
            plazoMeses,
            cuotaInicial,
            montoCapital,
            TEM,
            pagoMensual,
            usuarioId,
            propiedadId:propiedad,
        });
        await creditoGuardado.save();
        console.log(creditoGuardado);
        res.redirect('/simulacion-credito-hipotecario');
    } catch (error) {
        console.log(error)
    }

}

/* const credito = (req, res) => {

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
} */

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
    creditoh,
    crearCalculo
}