import express from "express"
import { admin, crear } from '../controllers/productoController.js'


const router = express.Router()


router.get('/productos-test', admin )
router.get('/mis-productos',admin)
router.get('/productos/crear',crear)


export default router