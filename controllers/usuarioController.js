import { check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'

import Usuario from '../models/Usuario.js'
import { generarJWT ,generarId} from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js'

const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    })
}

const autenticar = async (req,res) =>{
   //Validacion
   await check('email').isEmail().withMessage('El email es obligatorio').run(req)
   await check('password').notEmpty().withMessage('El password ES Obligatorio').run(req)

    
   let resultado = validationResult(req)

   // return res.json(resultado.array())

//Validacion: Verificando que el usuario este vacio
   if(!resultado.isEmpty()){
       //Errores
       return res.render('auth/login' , {
           pagina: 'Iniciar sesión', 
           csrfToken : req.csrfToken(),
           errores: resultado.array(),
         
       })
   }

   const { email, password } = req.body;

   //Comprobar si el usuario existe
   const usuario = await Usuario.findOne({where:{ email }})
   if(!usuario){
        return res.render('auth/login' , {
            pagina: 'Iniciar sesión', 
            csrfToken : req.csrfToken(),
            errores: [{msg: 'EL usuario No Existe'}]
      
    })
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        return res.render('auth/login' , {
            pagina: 'Iniciar sesión', 
            csrfToken : req.csrfToken(),
            errores: [{msg: 'Tu cuenta no ha sido Confirmada'}]
    })
    }
    //Revisar el Password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login' , {
            pagina: 'Iniciar sesión', 
            csrfToken : req.csrfToken(),
            errores: [{msg: 'El password es Incorrecto'}]
    })
    }
    //Autenticar el usuario
    const token = generarJWT({id: usuario.id, nombre: usuario.nombre})
    console.log(token)

    // Almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        // secure: true
    }).redirect('/mis-productos')
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


//Almacenar un usuario
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
//Mostrar mensaje de confirmacion
res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje: 'Hemos enviado un mail de confirmación, presiona en el enlace'
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

const formularioOlvidePassword =  (req, res) =>{
    let resultado = validationResult(req)
        res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso Deluxe Shop',
            csrfToken : req.csrfToken(),
            errores: resultado.array()
        })
}
//Buscar el usuario si existe o no
const findUsuario = async (req,res) =>{
const { email } = req.body 

const usuario = await Usuario.findOne({ where: {email}})
if(!usuario){
    
        res.render('auth/olvide-password', {
        pagina: 'Recupera el acceso a Deluxe Shop',
        csrfToken: req.csrfToken(),
        errores: [{msg: 'El email no pertenece a ningún usuario'}]
    })
}}


const resetPassword = async (req,res) => {
    //Validacion
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)  

    let resultado = validationResult(req)

    //Verificar que el resultado este vacío
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/olvide-password',{            
        pagina: 'Recupera tu acceso Deluxe Shop',
        csrfToken : req.csrfToken(),
        errores: resultado.array()
    })

}
//Buscar el usuario
const { email } = req.body

const usuario = usuario.findOne({where: {email}})
console.log (usuario)
if(!usuario)
return res.render('auth/olvide-password',{            
    pagina: 'Recupera tu acceso Deluxe Shop',
    csrfToken : req.csrfToken(),
    errores: [{msg:'El email no pertenece a ningun usuario'}]
})
//Generar un token y enviar el email
usuario.token = generarId();
await usuario.save();

//Enviar un email
emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
})


//Mostrar mensaje de confirmación
res.render('templates/mensaje', {
    pagina: 'Reestablece tu password',
    mensaje: 'Hemos enviado un mail con las instrucciones'
})

}
const comprobarToken = async (req, res) =>{

    const {token} = req.params;
    const usuario = await Usuario.findOne({where:{token}})
    if(!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'reestablece tu password',
            mensaje: 'Hubo un error al validar tu informacion, Intenta de nuevo',
            error: true

        })
    }
//Mostrar formulario para modificar el password
res.render('auth/reset-password', {
    pagina: 'Restablece Tu Password',
    csrfToken: req.csrfToken()
})


}
const nuevoPassword = async (req, res) =>{
    //validar elnuevo password
    await check('password').isLength({min: 6}).withMessage('El password al menos tiene que ser de 6 caracteres').run(req)
    let resultado = validationResult(req)

    // return res.json(resultado.array())

//Validacion: Verificando que el usuario este vacio
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/reset-password' , {
            pagina: 'Reestablece tu password', 
            csrfToken : req.csrfToken(),
            errores: resultado.array(),
          
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    //identificar quien hace el password
    const usuario = await Usuario.findOne({where: {token}})
    console.log(usuario)
    //Hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save();

    res.render('auth/confirmar-cuenta' , {
        pagina: "Password Restablecido",
        mensaje: 'El Password se guardó correctamente'

    })
}





export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    principal,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    findUsuario,
    comprobarToken,
    nuevoPassword
} 
