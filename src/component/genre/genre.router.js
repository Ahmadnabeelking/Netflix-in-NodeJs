import { Router } from 'express';
import * as genre from './controller/genre.controller.js'
import { valdaition } from './../../middleware/validition.js';
import * as valid from './gener.validition.js';

const router = Router();

router.post('/',valdaition(valid.CreateGener),genre.createGenre);
router.put('/update/:id',valdaition(valid.update),genre.updateGener);


export default router;