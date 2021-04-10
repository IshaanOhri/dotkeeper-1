/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-03 15:02:03
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 01:10:25
 * @Description: All project pages related routes
 */

import { Router } from 'express';
import { ensureAuth } from '../../middleware';
import { dashboard, projectOverview, createProject, projectAccess, projectSettings } from '../controllers';

const projectPagesRouter: Router = Router();

// @desc	Dashboard
// @route	GET /dashboard
projectPagesRouter.get('/dashboard', ensureAuth, dashboard);

// @desc	Project Overview
// @route	GET /project/overview/:projectId
projectPagesRouter.get('/project/overview/:projectId', ensureAuth, projectOverview);

// @desc	Project Access
// @route	GET /project/access/:projectId
projectPagesRouter.get('/project/access/:projectId', ensureAuth, projectAccess);

// @desc	Project Settings
// @route	GET /project/settings/:projectId
projectPagesRouter.get('/project/settings/:projectId', ensureAuth, projectSettings);

// @desc	Create Project
// @route	POST /project/create
projectPagesRouter.post('/project/create', ensureAuth, createProject);

export { projectPagesRouter };
