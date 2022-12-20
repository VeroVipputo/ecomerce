import { exit } from 'node:process'
import categorias from './categorias.js'
import Categoria from '../models/Categoria.js'
import Precio from '../models/Precio.js'
import db from '../config/db.js'
import precios from './precios.js'


const importarDatos = async () => { 
    try {
        //Autenticar
        await db.authenticate()

        //Generar las columnas
        await db.sync()

        //Insertamos los datos
        await Promise.all([
        Categoria.bulkCreate(categorias),
        Precio.bulkCreate(precios)
        ])
        console.log('Datos importados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}
const eliminarDatos = async () => {
    try {
        await db.sync({force:true})
            console.log("Datos Eliminados correctamente");
            exit()
        
    } catch (error) {
        console.log(error)
        exit(1)
        
    }
}

if(process.argv[2] === "-i") {
    importarDatos();
}

if(process.argv[2] === "-e") {
    eliminarDatos();
}
   