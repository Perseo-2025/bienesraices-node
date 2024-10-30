import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js'
import Credito from './Credito.js'
import Ciudad from './Ciudad.js'



//Precio.hasOne(Propiedad) //Propiedad tiene un precio
Propiedad.belongsTo(Precio, {foreignKey: 'precioId'})
Propiedad.belongsTo(Categoria, {foreignKey: 'categoriaId'})
Propiedad.belongsTo(Ciudad, {foreignKey: 'ciudadId'})
Propiedad.belongsTo(Usuario, {foreignKey: 'usuarioId'})
Propiedad.hasMany(Mensaje, {foreignKey: 'propiedadId'})

Mensaje.belongsTo(Propiedad, {foreignKey: 'propiedadId'})
Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})


Usuario.hasMany(Credito, { foreignKey: 'usuarioId' });

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}