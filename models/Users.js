import MemoryContainer from "../controllers/MemContainer.js";
import mongoose from 'mongoose';

const collection = "usuarios";

const usersSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const usersService = mongoose.model(collection,usersSchema);

class Users extends MemoryContainer{
    constructor() {super()};
    populate(quantity=50) {//Generar tantos usuarios como me indique el cliente, default:50
        const newUsers = [];
        for(let i = 0; i < quantity; i++)
        {
            let newUser = generateUser()

            this.save(newUser);
            newUsers.push(newUser)
        }
        return newUsers
    }
}
export default {Users,usersService}
