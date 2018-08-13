import { Router } from 'express';

import users from './users';
import authRoute from './socialAuthorize';
import articlesRoute from './articleRoutes';
import paymentsRoute from './payments';

const router = Router();

router.use('/', users);
router.use('/users/login', authRoute);
router.use('/', articlesRoute);
router.use('/', paymentsRoute);

export default router;
