import { Router } from 'express';

import ArticleControllers from '../../controllers/ArticleController';
import validateArticle from '../../middlewares/validateArticle';
import verifyToken from '../../middlewares/verifyToken';
import { checkCount, articleExists } from '../../middlewares/checkUser';
import validatePrice from '../../middlewares/validatePrice';
import getArticle from '../../middlewares/getArticle';
import toggleFree from '../../middlewares/toggleFree';


const router = Router();


router.post(
  '/articles',
  verifyToken,
  validateArticle,
  validatePrice,
  ArticleControllers.createArticle
);
router.put(
  '/articles/:slug',
  validateArticle,
  validatePrice,
  verifyToken,
  articleExists,
  checkCount,
  ArticleControllers.editArticle
);
router.delete(
  '/articles/:slug',
  verifyToken,
  articleExists,
  ArticleControllers.deleteArticle
);
router.get(
  '/articles/:slug',
  getArticle,
  toggleFree,
  ArticleControllers.getArticle
);
router.get(
  '/articles',
  ArticleControllers.listAllArticles
);

export default router;
