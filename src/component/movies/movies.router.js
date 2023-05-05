import { Router } from 'express';
import * as mive from './controller/movies.controller.js'
import { auth } from './../../middleware/auth.js';
import { myMulter,filevalidtion } from './../../service/multer.js';
import { endpoint } from './movies.endpiont.js';
import { valdaition } from './../../middleware/validition.js';
import * as valid from './movies.validition.js';
const router = Router ();

router.post('/add',auth(endpoint.add),myMulter(filevalidtion.image).single('Poster'),valdaition(valid.add),mive.add);
router.put('/update/:id',auth(endpoint.update),myMulter(filevalidtion.image).single('Poster'),mive.update);
router.delete('/delete/:id',auth(endpoint.delete),myMulter(filevalidtion.image).single('Poster'),mive.deleteMovies);
router.get('/show',mive.show);
export default router;
