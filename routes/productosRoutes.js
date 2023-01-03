import express from "express"
import { admin, crear, guardar } from '../controllers/productoController.js'


const router = express.Router()


router.get('/productos-test', admin )
router.get('/mis-productos', admin)
router.post('/productos/crear', guardar)


export default router