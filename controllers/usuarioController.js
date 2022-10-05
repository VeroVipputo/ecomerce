import { check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'


const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}

const formularioRegistro = (req,res) => {
    
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken : req.csrfToken()

    })
}

const principal = (req,res) => {
    res.render('auth/main', {
        pagina: "Principal"
    })
}

const registrar = async (req,res) => {
    //Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min: 6}).withMessage('El password al menos tiene que ser de 6 caracteres').run(req)
   // await check('repetir_ password').equals('password').withMessage('Repita exactamente el mismo password').run(req)
    
    let resultado = validationResult(req)

    // return res.json(resultado.array())

//Validacion: Verificando que el usuario este vacio
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta', 
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre:req.body.nombre,
                email: req.body.email
            }
        })
    }
    //Extraer los datos
    const {nombre, email, password} = req.body
   
    // Verificar que el usuario no esté duplicado
const existeUsuario = await Usuario.findOne( { where : { email }})

if(existeUsuario){
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta', 
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El Usuario ya esta registrado'}],
            usuario: {
                nombre:req.body.nombre,
                email: req.body.email}
})

}


//Almacear un usuario
const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
})
  
//Envia email de confirmacion
emailRegistro({
    nombre: usuario.nombre,
    email:  usuario.email,
    token:  usuario.token
})



}
//Funcion que comprueba una cuenta
const confirmar = async (req,res) => {

    const {token} = req.params;

    //Verificar si el token es valido
    const usuario = await Usuario.findOne({ where: {token}})

    if(!usuario) {
        return res.render('auth/confirmar-cuenta',{
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true 
        })
    }

    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    return res.render('auth/confirmar-cuenta',{
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmó correctamente'
      })
}

const formularioOlvidePassword = (res, req) =>{
        res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso Deluxe Shop',
            csrfToken : req.csrfToken()
        })
}

const resetPassword = (req,res) => {

}


export {
    formularioLogin,
    formularioRegistro,
    principal,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword
}