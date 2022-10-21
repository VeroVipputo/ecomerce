import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, principal, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword} from '../controllers/usuarioController.js';
import { emailRegistro } from '../helpers/emails.js';


const router = express.Router();

router.get('/login', formularioLogin);

router.get('/main', principal);
router.post('/main', principal);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPassword)

//Almacena el nuevo Password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

export default router