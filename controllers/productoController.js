
const admin = (req, res) => {
    res.render('productos/admin', {
        pagina: 'Mis Productos',
        barra: true
    })
}

//Formulario para crear un nuevo producto
const crear = (req, res) => {
    res.render('productos/crear', {
        pagina: 'Crear Producto',
        barra: true
    })
}

export {
    admin,
    crear
}