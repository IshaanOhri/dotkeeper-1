/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:16:10
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 01:55:14
 * @Description: Indexing file for all Routes
 */

import { Router } from 'express';
import { authRouter } from './auth';
import { miscRouter } from './misc';
import { projectPagesRouter } from './project-pages';
import { projectRouter } from './project';
import { fileRouter } from './file';

const router: Router = Router();

router.use(authRouter);
router.use(projectPagesRouter);
router.use('/project', projectRouter);
router.use(miscRouter);
router.use(fileRouter);

export { router };
