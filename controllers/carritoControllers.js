
const agregarProducto = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}
//ARREGLAR TODO ESTE ARCHIVO PARA QUE FUNCIONE
const cargarEventListeners = (req,res) => {
    res.render('auth/main', {
        pagina: "Crear Cuenta"
    })
}

const leerDatosProducto = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}

const carritoHTML = async (req,res) => {

   const producto = await producto.create(req.body)

   res.json(producto) 
    }




const eliminarProducto = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}

const sincronizarStorage = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}

const vaciarCarrito = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}


export{
    cargarEventListeners,
    agregarProducto,
    leerDatosProducto,
    eliminarProducto,
    carritoHTML,
    sincronizarStorage,
    vaciarCarrito
}