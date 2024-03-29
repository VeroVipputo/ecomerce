import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt';
import Users from './models/Users.js';

/* Bcrypts */
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (Users,password) => bcrypt.compareSync(password,Users.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




export default __dirname;