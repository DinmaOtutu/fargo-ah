import { Router } from 'express';

import ArticleControllers from '../../controllers/ArticleController';
import validateArticle from '../../middlewares/validateArticle';
import verifyToken from '../../middlewares/verifyToken';
import { checkCount, articleExists } from '../../middlewares/checkUser';
import searchForArticles from '../../middlewares/searchArticles';
import { listOfCategories } from '../../helpers/exports';

const router = Router();


router.post('/articles', verifyToken, validateArticle, ArticleControllers.createArticle);

router.put('/articles/:slug', validateArticle, verifyToken, articleExists, checkCount, ArticleControllers.editArticle);

router.delete('/articles/:slug', verifyToken, articleExists, ArticleControllers.deleteArticle);

router.get('/articles/:slug', ArticleControllers.getArticle);

router.get('/articles/list/categories', listOfCategories);

router.get('/articles', ArticleControllers.listAllArticles, searchForArticles);

export default router;
