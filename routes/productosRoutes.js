import express from "express"
import {admin} from '../controllers/productoController.js'

const router = express.Router()


router.get('/mis-productos', admin )


export default router