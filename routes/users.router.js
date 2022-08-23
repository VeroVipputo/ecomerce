import { Router } from "express";
import Users from "../models/Users.js";


const usersService = new Users();

const router = Router();

router.get('/', async (req,res) => {
    try {
        let users = await usersService.getAll();
        res.send({status:"success", payload:users})
    } catch (error) {
        res.status(500).send({status:"error",error: "Couldn't get users"})
    }

})
router.get('/populate',async (req,res)=>{
    try {
        let result = await usersService.populate();
        res.send({status:"Success", payload: result})
    } catch (error) {
        res.status(500).send({status:"error", error:"Couldn't populate users"})
        
    }
})
export default router;