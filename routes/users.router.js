import { Router } from "express";
import Users from "../models/Users.js";


//const usersService =  Users();

const router = Router();

router.post('/registro', async (req,res) => {
    try {
        let usersService = await usersService.getAll();
        const {nombre,email,password} = req.body;
        if (!nombre||!email||!password) return res.status(400).send({status:"error", error: "incomplete values"});
        let exists = await usersService.findOne({email:email});
        if (exists) return res.status(400).send({status:"error",error:"user already exists"});
        let result = await usersService.create({
            nombre,
            email,
            password
        })
        res.send({status:"success", payload:result.id})
    } catch (error) {
        console.log(error)
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
router.post('login', async(req,res)=>{
    
})

router.get('/', async (req, res) => {
    console.log('come chingon')
})
export default router;