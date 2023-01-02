import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config({path:'.env'});




const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS ?? '', {
    host: process.env.BD_HOST,
    port: 3000,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
         max:5, //MAX. DE CONEXION
         min:0,
         acquire: 30000, //30 SEGUNDOS ANTES DEL ERROR
         idle:10000       
    },
    operatorAliases: false
});

export default db;
