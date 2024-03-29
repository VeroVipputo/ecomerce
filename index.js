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
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import session from 'express-session';
// import MongoStore from 'connect-mongo';


// import passport from 'passport';
// import initializePassport from './config/passport.config.js';
import compression from "compression";

// Crear la APP
const app = express()

const swaggerOptions = {
     definition: {
          openapi:'3.0.1',
          info: {
               title: "API de Ecommerce",
               description: " Es una Api para probar documentacion"
          }
     },
     apis:[`${__dirname}/docs/**/*.yaml`]
}
const spects = swaggerJSDoc(swaggerOptions);

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended:true}));
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(spects));
app.use('/users',usersRouter);

//CORS (jntercambio de recursos de Origen cruzado)

app.use(cors());

//Habilitar cookie Parser
app.use(cookieParser())

// app.use(session({
//      secret: process.env.SECRETO,
//      key: process.env.KEY,
//      resave: false,
//      saveUninitialized: false,
//      store: MongoStore.create({mongoUrl: 'mongodb://localhost/bienesraices-node-mvc'} )

// }));

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

// mongoose.connect(`mongodb+srv://Tettacorp:<${process.env.MONGO_PASS}>@cluster17.63yiu.mongodb.net/bienesraices-node-mvc`)

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
    let string = "Backend";
    for(let i=0;i<1000;i++){
        string+=" Backend 2022";
        
    }
    res.send(string)
})


//Definir el puerto y arrancarlo
const port = 3000;

app.listen(port, () => {
     console.log(`El servidor esta funcionando en el puerto ${port}`)
})









