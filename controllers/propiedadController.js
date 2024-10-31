import { unlink } from "node:fs/promises";
import { validationResult } from "express-validator";
import {
  Precio,
  Categoria,
  Propiedad,
  Mensaje,
  Usuario,
} from "../models/index.js";
import { esVendedor, formatearFecha } from "../helpers/index.js";
import Ciudad from "../models/Ciudad.js";

const admin = async (req, res) => {
  // Leer QueryString
  const { pagina: paginaActual } = req.query;

  const expresion = /^[0-9]$/; // expresiones regulares para una paginación

  if (!expresion.test(paginaActual)) {
    return res.redirect("/mis-propiedades?pagina=1");
  }

  try {
    const { id } = req.usuario;
    //Limites y Offset para el paginador
    const limite = 5;
    const offset = paginaActual * limite - limite;

    const [propiedades, total] = await Promise.all([
      await Propiedad.findAll({
        limite: limite,
        offset,
        where: { usuarioId: id },
        include: [
          { model: Categoria, as: "categoria" },
          { model: Precio, as: "precio" },
          { model: Mensaje, as: "mensajes" },
          { model: Usuario, as: "usuario" },
        ],
      }),
      Propiedad.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);

    res.render("propiedades/admin", {
      pagina: "Mis Propiedades",
      barra: true,
      propiedades,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limite),
      paginaActual: Number(paginaActual),
      total,
      offset,
      limite,
    });
  } catch (error) {
    console.log(error);
  }
};

//Formulario sobre crear una propiedad
const crear = async (req, res) => {
  //Consulta el Modelo de Precio y Categoria
  const [categorias, precios, ciudades] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
    Ciudad.findAll(),
  ]);

  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    ciudades,
    datos: {},
  });
};
const guardar = async (req, res) => {
  //Valdiacion
  let resultado = validationResult(req);
  console.log("guardando ", resultado);

  if (!resultado.isEmpty()) {
    //Consultar el modelo de precios y categorias
    const [categorias, precios, ciudades] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
      Ciudad.findAll(),
    ]);

    return res.render("propiedades/crear", {
      pagina: "Crear Propiedad",
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      ciudades,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Crear un registro
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio,
    categoria,
    ciudad,
  } = req.body;

  const { id: usuarioId } = req.usuario;

  try {
    const propiedadGuardado = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId: precio,
      categoriaId: categoria,
      usuarioId,
      ciudadId: ciudad,
      imagen: "",
    });

    const { id } = propiedadGuardado;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  const { id } = req.params;

  // Validar que la propiedad existe
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }
  // Validar  que la propiedad no esté publicado
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }
  // Validar que la propiedad pertenece a quien visite esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/agregar-imagen", {
    pagina: `Agregar Imagen: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad,
  });
};

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;

  // Validar que la propiedad existe
  const propiedad = await Propiedad.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }
  // Validar  que la propiedad no esté publicado
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }
  // Validar que la propiedad pertenece a quien visite esta página
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    console.log(req.file);

    //almacenar la imagen y publicar la propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;

    await propiedad.save();

    //res.redirect('/mis-propiedades')
    next();
  } catch (error) {
    console.log(error);
  }
};
const editar = async (req, res) => {
  const { id } = req.params;

  //validar que la propieda exista
  const propiedad = await Propiedad.findByPk(id);
  const usuario = await Usuario.findByPk(req.usuario.id);
  console.log('====================================');
  console.log(usuario);
  console.log('====================================');

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien vista la url es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }
  //Consulta el Modelo de Precio y Categoria
  const [categorias, precios, ciudades] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
    Ciudad.findAll(),
  ]);

  res.render("propiedades/editar", {
    pagina: ` Editar Propiedad: ${propiedad.titulo} `,
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    ciudades,
    usuario: req.usuario,
    datos: propiedad,
  });
};
const guardarCambios = async (req, res) => {
  //verificar la validacion
  let resultado = validationResult(req);
  console.log("guardando ", resultado);

  if (!resultado.isEmpty()) {
    //Consultar el modelo de precios y categorias
    const [categorias, precios,ciudades] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
      Ciudad.findAll(),
    ]);
    return res.render("propiedades/editar", {
      pagina: ` Editar Propiedad `,
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      ciudades,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  const { id } = req.params;

  //validar que la propieda exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien vista la url es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }
  // Reescribir el    Objeto y Actualizarlo
  try {
    const {
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precio: precioId,
      categoria: categoriaId,
      ciudad: ciudadId,
    } = req.body;

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
      categoriaId,
      ciudadId,
    });

    await propiedad.save();

    res.redirect("/mis-propiedades");
  } catch (error) {
    console.log("Oye hdpt hay un Error en:", error);
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;

  //validar que la propieda exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien vista la url es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //Eliminar la Imagen asociada
  await unlink(`public/uploads/${propiedad.imagen}`);
  console.log(`Se eliminó la imagen correctamente: ${propiedad.imagen}`);

  // Eliminar la propiedad
  await propiedad.destroy();
  res.redirect("/mis-propiedades");
};

//Modifica el estado de la propiedad
const cambiarEstado = async (req, res) => {
  const { id } = req.params;

  //validar que la propieda exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien vista la url es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  propiedad.publicado = !propiedad.publicado;

  await propiedad.save();

  res.json({
    resultado: true,
  });
};

//Muestra una propiedad
const mostrarPropiedad = async (req, res) => {
  const { id } = req.params;

  //console.log(req.usuario)
  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id, {
    include: [
      { model: Precio, as: "precio" },
      { model: Categoria, as: "categoria" },
      { model: Usuario, as: "usuario" },
    ],
  });

  if (!propiedad || !propiedad.publicado) {
    return res.redirect("/404");
  }

  // Incrementa el contador de visitas
  propiedad.visitas += 1;
  await propiedad.save();

  res.render("propiedades/mostrar", {
    propiedad,
    pagina: propiedad.titulo,
    csrfToken: req.csrfToken(),
    usuario: req.usuario,
    esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
  });
};

const enviarMensaje = async (req, res) => {
  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id, {
    include: [
      { model: Precio, as: "precio" },
      { model: Categoria, as: "categoria" },
      //{model: Usuario, as: 'usuario'},
    ],
  });
  if (!propiedad) {
    return res.redirect("/404");
  }
  // Renderizar los errores en caso exista
  //Valdiacion
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("propiedades/mostrar", {
      propiedad,
      pagina: propiedad.titulo,
      csrfToken: req.csrfToken(),
      usuario: req.usuario,
      esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
      errores: resultado.array(),
    });
  }
  // console.log(req.body);
  // console.log(req.params);
  // console.log(req.usuario);
  const { mensaje } = req.body;
  const { id: propiedadId } = req.params;
  const { id: usuarioId } = req.usuario;

  // Almacenar el mensaje
  await Mensaje.create({
    mensaje,
    propiedadId,
    usuarioId,
  });

  res.redirect("/");
};

//Leer mensajes recibidos
const verMensajes = async (req, res) => {
  const { id } = req.params;

  //validar que la propieda exista
  const propiedad = await Propiedad.findByPk(id, {
    include: [
      {
        model: Mensaje,
        as: "mensajes",
        include: [{ model: Usuario.scope("eliminarPassword"), as: "usuario" }],
      },
    ],
  });

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien vista la url es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/mensajes", {
    pagina: "Mensajes",
    mensajes: propiedad.mensajes,
    formatearFecha,
  });
};

export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  cambiarEstado,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes,
};
