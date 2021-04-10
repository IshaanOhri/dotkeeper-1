/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-04 01:30:43
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 18:15:29
 * @Description: Defines functions for all project related routes
 */

import { NextFunction, Response } from 'express';
import { User } from '../../database/models';
import { Project } from '../../database/models/Project';
import { IProject, IRequest, IUser, IVariable } from '../../interfaces';
import { catchAsync } from '../../middleware';
import _ from 'lodash';
import { HttpError, HttpResponse } from '../../handlers';
import { message, status } from '../../config';
import { IPermissionData } from '../../interfaces/IPermissionData';

// Edit GitHub Link
const github = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const { github }: { github: string } = req.body;
	const project: IProject = req.project;

	project.github = github;
	await project.save();

	next(new HttpResponse(status.ok, null));
});

// Edit Website Link
const website = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const { website }: { website: string } = req.body;
	const project: IProject = req.project;

	project.website = website;
	await project.save();

	next(new HttpResponse(status.ok, null));
});

// Add environment variable
const addVariable = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const { key, value }: { key: string; value: string } = req.body;

	const project: IProject = req.project;

	const variable: IVariable = {
		key,
		value,
	};

	const index: number = _.findIndex(project.variables, function (temp: IVariable) {
		return temp.key == variable.key;
	});

	if (index === -1) {
		project.variables.push(variable);
	} else {
		project.variables[index].value = variable.value;
	}

	await project.save();

	next(new HttpResponse(status.ok, null));
});

// Delete environment variable
const deleteVariable = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const { key }: { key: string } = req.body;

	const project: IProject = req.project;

	const index: number = _.findIndex(project.variables, function (temp: IVariable) {
		return temp.key == key;
	});

	if (index != -1) {
		project.variables.splice(index, 1);
	}

	await project.save();

	next(new HttpResponse(status.ok, null));
});

// Delete project
const deleteProject = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const project: IProject = req.project;

	await project.delete();

	next(new HttpResponse(status.ok, null));
});

// Add collaborator
const addCollaborator = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const {
		collaboratorEmail,
		collaboratorPermission,
	}: { collaboratorEmail: string; collaboratorPermission: string } = req.body;

	const project: IProject = req.project;

	const collaborator: IUser | null = await User.findOne({
		email: collaboratorEmail,
	});

	if (!collaborator) {
		next(new HttpError(status.notFound, null, message.emailNotFound));
		return;
	}

	const index: number = _.findIndex(project.users, function (temp: IPermissionData) {
		return temp.email == collaboratorEmail;
	});

	if (index === -1) {
		project.users.push({
			userId: collaborator._id,
			email: collaboratorEmail,
			permission: collaboratorPermission,
		});
	} else {
		project.users[index].permission = collaboratorPermission;
	}

	await project.save();

	next(new HttpResponse(status.ok, null));
});

// Delete collaborator
const deleteCollaborator = catchAsync(async (req: IRequest, res: Response, next: NextFunction) => {
	const { collaboratorEmail }: { collaboratorEmail: string } = req.body;

	const project: IProject = req.project;

	const modifiedUser: IPermissionData[] = [];

	_.forEach(project.users, (tempUser: IPermissionData) => {
		if (tempUser.email != collaboratorEmail) {
			modifiedUser.push(tempUser);
		}
	});

	project.users = modifiedUser;

	await project.save();

	next(new HttpResponse(status.ok, null));
});

export { github, website, addVariable, deleteVariable, deleteProject, addCollaborator, deleteCollaborator };
