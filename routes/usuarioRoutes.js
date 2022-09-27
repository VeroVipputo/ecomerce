import express from 'express';
import { formularioLogin, formularioRegistro, registrar, principal} from '../controllers/usuarioController.js';


const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', formularioLogin);
router.get('/main', principal);
router.post('/main', principal);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);




export default router