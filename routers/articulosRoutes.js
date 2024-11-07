import express from 'express';
import { getArticles, postArticle } from '../controllers/articulosController.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', postArticle);

export default router;
