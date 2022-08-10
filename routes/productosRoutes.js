import express from "express"
import {admin} from '../controllers/productoControler.js'

const router = express.Router()


router.get('/mis-productos', admin )


export default router