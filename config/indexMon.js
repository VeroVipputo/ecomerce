import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dotenv = require ('dotenv');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TettaCorp:<password>@cluster0.mbrit.mongodb.net/?retryWrites=true&w=majority";
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
      imagen: 'bourbon',
      titulo: 'Bourbon Clarkes 1866',
      precio: '400',
      id: '',
      cantidad: 1
  }
  const productoSaved = new ProductoModel(user);
  let response  = await productoSaved.save()
  console.log(response)

  console.log("CREATE OTHER PRODUCT");
  await ProductoModel.create({
    imagen: 'bourbon',
    titulo: 'Bourbon Clarkes 1866',
    precio: '400',
    id: '',
    cantidad: 1
  });


export default {ProductoModel, producto};
