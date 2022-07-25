import express from 'express';
import { 
    cargarEventListeners,
    agregarCurso,
    leerDatosCurso,
    eliminarCurso,
    carritoHTML,
    sincronizarStorage,
    eliminarCurso,
    vaciarCarrito} from '../controllers/usuarioControler.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.get('/main', principal);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/olvide-password', formularioOlvidePassword)



export default router