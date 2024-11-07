import express from 'express';
import { getTerceros, postTercero } from '../controllers/tercerosController.js';

const router = express.Router();

router.get('/', getTerceros);
router.post('/', postTercero);

export default router;
