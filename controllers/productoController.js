
const admin = (req, res) => {
    res.render('productos/admin', {
        pagina: 'Mis Productos'
    })
}

export {
    admin
}