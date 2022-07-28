import express from 'express';
import { 
    cargarEventListeners,
    agregarProducto,
    leerDatosProducto,
    eliminarProducto,
    carritoHTML,
    sincronizarStorage,
    eliminarProducto,
    vaciarCarrito} from '../controllers/carritoControlers.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.get('/main', principal);
router.post('/main', principal);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/olvide-password', formularioOlvidePassword)



export default router