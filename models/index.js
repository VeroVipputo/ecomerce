import Producto from './Producto.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'

Precio.hasOne(Producto)

Producto.belongsTo(Precio, {foreignKey: 'precioId'})
Producto.belongsTo(Categoria, {foreignKey: 'categoriaId'})
Producto.belongsTo(Usuario, {foreignKey: 'usuarioId'})

export {
    Producto,
    Precio,
    Categoria,
    Usuario
}