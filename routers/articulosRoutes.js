import express from 'express';
import { getArticles, createArticle } from '../controllers/articulosController';

const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);

export default router;