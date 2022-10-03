import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, principal, formularioOlvidePassword} from '../controllers/usuarioController.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', formularioLogin);
router.get('/main', principal);
router.post('/main', principal);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar);
router.get('/olvide-password', formularioOlvidePassword)



export default router