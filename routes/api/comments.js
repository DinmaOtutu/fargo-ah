import { Router } from 'express';

import CommentsController from '../../controllers/CommentsController';
import getArticle from '../../middlewares/getArticle';
import getUser from '../../middlewares/getUser';
import verifyToken from '../../middlewares/verifyToken';
import ParamsValidator from '../../middlewares/ParamsValidator';
import getComment from '../../middlewares/getComment';

const router = Router();

router.post(
  '/articles/:slug/comments',
  verifyToken,
  getUser,
  getArticle,
  CommentsController.createComment
);

router.get(
  '/articles/:slug/comments',
  getArticle,
  CommentsController.getComments
);

router.delete(
  '/articles/:slug/comments/:id',
  verifyToken,
  ParamsValidator.validateParamId,
  getComment,
  CommentsController.deleteComment
);

router.post(
  '/articles/:slug/comments/:id',
  verifyToken,
  ParamsValidator.validateParamId,
  getUser,
  getComment,
  CommentsController.createReply
);

export default router;
