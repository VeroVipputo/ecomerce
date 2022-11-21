import express from 'express';
import cors from 'cors';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import  carritoRoutes from './routes/carritoRoutes.js';
import db from './config/db.js';
import usersRouter from './routes/users.router.js';
//import mongoose from 'mongoose';

import __dirname from './utils.js';
//import MongoStore from 'connect-mongo';
//import session from 'express-session';
// import passport from 'passport';
// import initializePassport from './config/passport.config.js';
import compression from "compression";

// Crear la APP
const app = express()

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended:true}))
app.use('/users',usersRouter);

//CORS (jntercambio de recursos de Origen cruzado)

app.use(cors());

//Habilitar cookie Parser
app.use(cookieParser())

//Habilitar el CSRF
app.use( csrf({cookie:true}))

//Conexion a la base de datos MySQL
try {
     await db.authenticate();
     db.sync()
     console.log('Conexion Correcta a la base de datos')
} catch (error) {
     console.log(error)
}

// app.listen(27017,()=> { console.log("Conectado a Mongo")})
// const mongoUrl = "mongodb://localhost:27017";
//mongoose.connect(mongoUrl)
//mongoose.connect(`mongodb+srv://Tettacorp:<${process.env.MONGO_PASS}>@cluster17.63yiu.mongodb.net/bienesraices-node-mvc?retryWrites=true&w=majority`)

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views','./views')
app.set('views',__dirname +'/views')
app.use(express.json());
//Carpeta Publica
app.use(express.static(__dirname+'/public'));


//  initializePassport();
//  app.use(passport.initialize());
//  app.use(passport.session());


// Definiendo un Routing (Middlewares)
app.use('/auth', usuarioRoutes)
app.use('/auth', carritoRoutes)
app.use('/', productosRoutes)
app.get('/getCookie',(req,res)=>{
console.log(req.cookies);
res.send(req.cookies);
 })


app.use(compression());
app.get('/',(req,res)=>{
    let string = "Hola cómo están";
    for(let i=0;i<1000;i++){
        string+="Hola cómo están";
    }
    res.send(string)
})


//Definir el puerto y arrancarlo
const port = 3000;

app.listen(port, () => {
     console.log(`El servidor esta funcionando en el puerto ${port}`)
})









