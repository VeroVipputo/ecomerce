import mongoose from "mongoose";

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
    name: "Juana",
    lastName: "Perez",
    email: "test@test.com",
    userName: "jperez",
    password: 123456,
  });


export default UserModel;
