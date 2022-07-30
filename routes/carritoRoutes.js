import express from 'express';
import { 
    cargarEventListeners,
    agregarProducto,
    leerDatosProducto,
    eliminarProducto,
    carritoHTML,
    sincronizarStorage,
    vaciarCarrito} from '../controllers/carritoControlers.js';


const router = express.Router();

router.get('/main', cargarEventListeners);
router.get('/main', agregarProducto);
router.post('/main', agregarProducto);
router.post('/main', leerDatosProducto);
router.get('/main', eliminarProducto);
router.post('/main', eliminarProducto);
router.get('/main', carritoHTML);
router.post('/main', carritoHTML);
router.get('/main', sincronizarStorage)
router.post('/main', vaciarCarrito)



export default router