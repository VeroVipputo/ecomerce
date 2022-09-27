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
            errores: [{msg: 'El Usuario ya esta registrado'}],
            usuario: {
                nombre:req.body.nombre,
                email: req.body.email}
})

}

console.log(existeUsuario)

return;
  

const OlvidePassword =  (req,res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a la cuenta'
    })
}

}


export{
    formularioLogin,
    formularioRegistro,
    principal,
    registrar,
    OlvidePassword
}