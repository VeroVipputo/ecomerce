import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la APP
const app = express()

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended:true}))


//Conexion a la base de datos
try {
     await db.authenticate();
     db.sync()
     console.log('Conexion Correcta a la base de datos')
} catch (error) {
     console.log(error)
}


//Habilitar Pug
app.set('view engine', 'pug')
app.set('views','./views')

//Carpeta Publica
app.use(express.static('public'))

// Definiendo un Routing (Middlewares)
app.use('/auth', usuarioRoutes)


//Definir el puerto y arrancarlo
const port = 3000;

app.listen(port, () => {
     console.log(`El servidor esta funcionando en el puerto ${3000}`)
})
