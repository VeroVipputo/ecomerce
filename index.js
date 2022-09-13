import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
//import productosRoutes from './routes/productosRoutes.js';
import  carritoRoutes from './routes/carritoRoutes.js';
import db from './config/db.js';
import usersRouter from './routes/users.router.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


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
const serverm = app.listen(27017,()=> { console.log("Conectado a Mongo")})
const connection = mongoose.connect('mongodb+srv://Tettacorp:<T3tt4m4nt!>@cluster17.63yiu.mongodb.net/bienesraices-node-mvc?retryWrites=true&w=majority')

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views','./views')
app.set('views',__dirname +'/views')
app.use(express.json());
//Carpeta Publica
app.use(express.static(__dirname+'/public'));
app.use(session({
     secret:"CoderSecretosoConquesoporfavorypapas",
     store:MongoStore.create({
         mongoUrl:'mongodb+srv://Tettacorp:<T3tt4m4nt!>@cluster17.63yiu.mongodb.net/bienesraices-node-mvc?retryWrites=true&w=majority',
         mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
         ttl:27017
     }),
     resave:false,
     saveUninitialized:false
 }))
 initializePassport();
 app.use(passport.initialize());
 app.use(passport.session());
app.use(cookieParser)

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
