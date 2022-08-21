import { check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesión"
    })
}

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
    //Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min: 6}).withMessage('El password al menos tiene que ser de 6 caracteres').run(req)
  //  await check('password').equals('password').withMessage('Repita exactamente el mismo password').run(req)
    
    let resultado = validationResult(req)

    // return res.json(resultado.array())

//Validacion: Verificando que el usuario este vacio
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro' , {
            pagina: 'Crear cuenta', 
            errores: resultado.array(),
            usuario: {
                nombre:req.body.nombre
            }
        })
    }

    res.json(resultado.array());
   
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