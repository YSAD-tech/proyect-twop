import express from 'express';
import { getMovimientos, postMovimiento } from '../controllers/movimientosController.js';

const router = express.Router();

router.get('/', getMovimientos);
router.post('/', postMovimiento);

export default router;
