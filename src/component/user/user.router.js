import { Router } from 'express';
import * as cha from './controller/user.controller.js'
import { auth } from './../../middleware/auth.js';
import { endpoint } from './user.endpoint.js';
import { valdaition } from './../../middleware/validition.js';
import * as valid from './user.validition.js';
const router = Router ();

router.patch('/changepassword',auth(endpoint.update),valdaition(valid.update),cha.updatepassword);
export default router;
