import Precio from "../models/Precio.js"
import Categoria from "../models/Categoria.js"

const admin = (req, res) => {
    res.render('productos/admin', {
        pagina: 'Mis Productos',
        barra: true
    })
}

//Formulario para crear un nuevo producto
const crear = async (req, res) => {
    //Consultar precio y Categoría
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('productos/crear', {
        pagina: 'Crear Producto',
        barra: true,
        categorias,
        precios
    })
}

export {
    admin,
    crear
}