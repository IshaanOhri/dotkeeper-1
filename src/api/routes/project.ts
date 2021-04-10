/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-03 15:02:03
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 18:14:54
 * @Description: All project related routes
 */

import { Router } from 'express';
import { ensureAuth, permissionAuth } from '../../middleware';
import {
	github,
	website,
	addVariable,
	deleteVariable,
	deleteProject,
	addCollaborator,
	deleteCollaborator,
} from '../controllers';

const projectRouter: Router = Router();

// @desc	Edit GitHub Link
// @route	PATCH /project/edit/github
projectRouter.patch('/edit/github', ensureAuth, permissionAuth(['owner', 'editor']), github);

// @desc	Edit Website Link
// @route	PATCH /project/edit/website
projectRouter.patch('/edit/website', ensureAuth, permissionAuth(['owner', 'editor']), website);

// @desc	Add Env Variable
// @route	POST /project/edit/variable
projectRouter.post('/edit/variable', ensureAuth, permissionAuth(['owner', 'editor']), addVariable);

// @desc	Delete Env Variable
// @route	DELETE /project/edit/variable
projectRouter.delete('/edit/variable', ensureAuth, permissionAuth(['owner', 'editor']), deleteVariable);

// @desc	Delete Project
// @route	DELETE /project/delete
projectRouter.delete('/delete', ensureAuth, permissionAuth(['owner']), deleteProject);

// @desc	Add Collaborator
// @route	POST /project/edit/collaborator
projectRouter.post('/edit/collaborator', ensureAuth, permissionAuth(['owner']), addCollaborator);

// @desc	Delete Collaborator
// @route	DELETE /project/edit/collaborator
projectRouter.delete('/edit/collaborator', ensureAuth, permissionAuth(['owner']), deleteCollaborator);

// @desc	Project Overview
// @route	GET /project/overview/:projectId
// projectRouter.get('/project/overview/:projectId', projectOverview);

// // @desc	Create Project
// // @route	POST /project/create
// projectRouter.post('/project/create', ensureAuth, createProject);

export { projectRouter };
