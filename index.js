import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
//import productosRoutes from './routes/productosRoutes.js';
import  carritoRoutes from './routes/carritoRoutes.js';
import db from './config/db.js';
import usersRouter from './routes/users.router.js';

//import cookieParser from 'cookie-parser';
//import __dirname from './utils.js';



// Crear la APP
const app = express()

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended:true}))
app.use('/users',usersRouter);


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
//app.set('views','./views')
//app.set('views',__dirname +'/views')

//Carpeta Publica
app.use(express.static('public'))
//app.use(cookieParser)

// Definiendo un Routing (Middlewares)
app.use('/auth', usuarioRoutes)
app.use('/auth', carritoRoutes)
//app.use('/', productosRoutes)
// //app.get('/getCookie',(req,res)=>{
//  //    console.log(req.cookies);
//      res.send(req.cookies);
//  })
 


//Definir el puerto y arrancarlo
const port = 3000;

app.listen(port, () => {
     console.log(`El servidor esta funcionando en el puerto ${3000}`)
})
