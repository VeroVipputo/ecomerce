import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            }
        });
    

const {email, nombre, token} = datos
//Enviar el email
 await transport.sendMail({
    from : 'deluxe.com.ar',
    to : email,
    subject : 'Confirma tu cuenta en deluxe.com.ar',
    text: 'Confirma tu cuenta en deluxe.com.ar',
    html : `
        <p>Hola ${nombre}, comprueba tu cuenta en deluxe.com.ar </p>
        
        <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
        <a href="${process.env.BACKEND_URL}:${process.env.PORT??3000}/auth/confirmar/:${token}">Confirmar Cuenta</a></p>

        <p>Si tu no creaste esta encuesta, puedes ignorar el mensaje</p>

        `

})}


const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            }
        });
    

const {email, nombre, token} = datos
//Enviar el email
 await transport.sendMail({
    from : 'deluxe.com.ar',
    to : email,
    subject : 'Reestablece tu password en deluxe.com.ar',
    text: 'Reestablece tu password en deluxe.com.ar',
    html : `
        <p>Hola ${nombre}, has solicitado reestablecer tu contraseña en deluxe.com.ar </p>
        
        <p>Sigue el siguiente enlace para generar un password nuevo: 
        <a href="${process.env.BACKEND_URL}:${process.env.PORT??3000}/auth/olvide-password/:${token}">
        Reestablecer password</a></p>

        <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p> `

})}

export { emailRegistro, emailOlvidePassword };