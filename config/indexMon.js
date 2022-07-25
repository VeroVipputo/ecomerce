import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dotenv = require ('dotenv');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TettaCorp:<password>@cluster0.mbrit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const {Schema, model} = mongoose;

const userCollection = 'users';

const UserSchema = new Schema({
  name: { type:String, required: true, max:100 },
  lastName: { type:String, required: true, max:100 },
  email: { type:String, required: true, max:100 },
  userName: { type:String, required: true, max:100 },
  password: { type:Number, required: true}, 
})

const UserModel = model(userCollection, UserSchema)
/* --------------------------------------- */
  /*                CREATE                   */
  /* --------------------------------------- */
  console.log('Create')
  const user = {
      name: 'Juan',
      lastName: 'Perez',
      email: 'test@test.com',
      userName: 'jperez',
      password: 123456
  }
  const userSaved = new UserModel(user);
  let response  = await userSaved.save()
  console.log(response)

  console.log("CREATE OTHER USER");
  await UserModel.create({
    name: "Juan",
    lastName: "Perez",
    email: "test@test.com",
    userName: "jperez",
    password: 123456,
  });


export default UserModel;
