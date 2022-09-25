import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dotenv = require ('dotenv');

const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = 'mongodb+srv://Tettacorp:<T3tt4m4nt!>@cluster17.63yiu.mongodb.net/bienesraices-node-mvc?retryWrites=true&w=majority';
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
const product = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
product.connect(err => {
  const collection = product.db("test").collection("devices");
  // perform actions on the collection object
  product.close();
});


const {Schema, model} = mongoose;

const productoCollection = 'productos';

const ProductoSchema = new Schema({
  imagen: { type:String, required: true, max:100 },
  titulo: { type:String, required: true, max:100 },
  precio: { type:Number, required: true },
  id: { type:String, required: true, max:100 },
  cantidad: { type:Number, required: true}, 
})

const ProductoModel = model(productoCollection, ProductoSchema)
/* --------------------------------------- */
  /*                CREATE                   */
  /* --------------------------------------- */
  console.log('Create')
  const producto = {
      imagen: '../img/bourbon.jpg',
      titulo: 'Bourbon Clarkes 1866',
      precio: '400',
      id: '',
      cantidad: 1
  }
  const productoSaved = new ProductoModel(product);
  let response  = await productoSaved.save()
  console.log(response)

  console.log("CREATE OTHER PRODUCT");
  await ProductoModel.create({
    imagen: '../img/bourbon.jpg',
    titulo: 'Bourbon Clarkes 1866',
    precio: '400',
    id: '',
    cantidad: 1
  });


export default {ProductoModel, producto};
