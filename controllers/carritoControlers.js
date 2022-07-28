import Usuario from '../models/Usuario.js'

const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesión"
    })
}
//ARREGLAR TODO ESTE ARCHIVO PARA QUE FUNCIONE
const formularioRegistro = (req,res) => {
    res.render('auth/registro', {
        pagina: "Crear Cuenta"
    })
}

const principal = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}

const registrar = async (req,res) => {

   const usuario = await Usuario.create(req.body)

   res.json(usuario) 
    }




const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password', {
        pagina: "Recupera tu acceso a la cuenta"
    })
}




export{
    formularioLogin,
    formularioRegistro,
    principal,
    registrar,
    formularioOlvidePassword
}