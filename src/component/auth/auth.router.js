import { Router } from "express";
import * as  authcontrol from './controller/auth.controller.js';
import { valdaition } from './../../middleware/validition.js';
import * as valid from './auth.valdition.js'
const router = Router();


router.post('/singup',valdaition(valid.singup),authcontrol.singup);
router.get('/confirmemail/:token',authcontrol.confirmEmail);
router.post('/singin',valdaition(valid.singin),authcontrol.singin);


export default router;