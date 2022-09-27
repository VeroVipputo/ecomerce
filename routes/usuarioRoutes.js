import express from 'express';
import { formularioLogin, formularioRegistro, registrar, principal, OlvidePassword} from '../controllers/usuarioController.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', formularioLogin);
router.get('/main', principal);
router.post('/main', principal);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/olvide-password' , OlvidePassword);
router.post('/olvide-password' , OlvidePassword);


export default router