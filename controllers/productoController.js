
const admin = (req, res) => {
    res.render('productos/admin', {
        pagina: 'Mis Productos',
        barra: true
    })
}

export {
    admin
}