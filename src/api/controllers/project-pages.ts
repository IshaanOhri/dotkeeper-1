/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-04 01:30:43
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-10 18:38:01
 * @Description: Defines functions for all project pages related routes
 */

import { Response } from 'express';
import { User } from '../../database/models';
import { Project } from '../../database/models/Project';
import { IProject, IRequest, IUser, IVariable } from '../../interfaces';
import { IProjectCard } from '../../interfaces/IProjectCard';
import { catchAsync } from '../../middleware';
const cryptoRandomString = require('crypto-random-string');
import _ from 'lodash';
import { IPermissionData } from '../../interfaces/IPermissionData';

const dashboard = catchAsync(async (req: IRequest, res: Response) => {
	const user: IUser = req.user;

	await user.populate({ path: 'projects' }).execPopulate();

	const modifiedProjects: IProjectCard[] = [];

	user.projects.forEach((project: IProject) => {
		const permissionData: IPermissionData | undefined = project.users.find(
			({ userId }: IPermissionData) => String(userId) == user._id
		);

		if (!permissionData) {
			res.render('error/404');
			return;
		}

		const tempProject: IProjectCard = {
			projectId: project.projectId,
			projectName: project.name,
			permission: permissionData.permission,
		};

		modifiedProjects.push(tempProject);
	});

	res.render('dashboard', {
		// userId: user.userId,
		name: user.displayName,
		image: user.image,
		email: user.email,
		projects: modifiedProjects,
	});
});

const projectOverview = catchAsync(async (req: IRequest, res: Response) => {
	const projectId: string = req.params.projectId;

	const user: IUser = req.user;

	if (!projectId) {
		res.redirect('/dashboard');
		return;
	}

	await user.populate({ path: 'projects' }).execPopulate();

	const project: IProject | undefined = _.find(user.projects, { projectId });

	if (!project) {
		res.render('error/404');
		return;
	}

	const permissionData: IPermissionData | undefined = project.users.find(
		({ userId }: IPermissionData) => String(userId) == user._id
	);

	if (!permissionData) {
		res.render('error/404');
		return;
	}

	const keys: string[] = [];

	project.variables.forEach((variable: IVariable) => {
		keys.push(variable.key);
	});

	res.render('overview', {
		projectName: project.name,
		projectId: project.projectId,
		variables: project.variables,
		github: project.github,
		website: project.website,
		permission: permissionData.permission,
		keys,
	});
});

const projectAccess = catchAsync(async (req: IRequest, res: Response) => {
	const projectId: string = req.params.projectId;
	const user: IUser = req.user;

	const project: IProject | null = await Project.findOne({ projectId });

	if (!project) {
		res.render('error/404');
		return;
	}

	const validUser: any = _.find(project.users, function (tempUser: IUser) {
		return tempUser.email === user.email;
	});

	if (!validUser) {
		res.render('error/404');
		return;
	}

	const emails: string[] = [];
	let userPermission: string = '';

	project.users.forEach((tempUser: any) => {
		emails.push(tempUser.email);
		if (tempUser.email === user.email) userPermission = tempUser.permission;
	});

	_.remove(project.users, function (temp: IPermissionData) {
		return temp.email === user.email;
	});

	res.render('access', {
		userEmail: user.email,
		userPermission,
		projectName: project.name,
		projectId: project.projectId,
		users: project.users,
		emails,
	});
});

const projectSettings = catchAsync(async (req: IRequest, res: Response) => {
	const projectId: string = req.params.projectId;

	const user: IUser = req.user;

	if (!projectId) {
		res.redirect('/dashboard');
		return;
	}

	await user.populate({ path: 'projects' }).execPopulate();

	const project: IProject | undefined = _.find(user.projects, { projectId });

	if (!project) {
		res.render('error/404');
		return;
	}

	const permissionData: IPermissionData | undefined = project.users.find(
		({ userId }: IPermissionData) => String(userId) == user._id
	);

	if (!permissionData) {
		res.render('error/404');
		return;
	}

	res.render('settings', {
		projectName: project.name,
		projectId: project.projectId,
		github: project.github,
		website: project.website,
		permission: permissionData.permission,
	});
});

const createProject = catchAsync(async (req: IRequest, res: Response) => {
	const user: IUser = req.user!;

	const { name }: { name: string } = req.body;

	let projectId: string = '';

	let available: boolean = false;

	while (!available) {
		projectId = name.split(' ')[0] + '-' + cryptoRandomString(5);

		projectId = projectId.toLowerCase();

		if (!(await Project.projectIdExists(projectId))) {
			available = true;
		}
	}

	const project: IProject = new Project({
		projectId,
		name,
		users: [
			{
				userId: user._id,
				email: user.email,
				permission: 'owner',
			},
		],
		variables: [],
	});

	await project.save();

	res.redirect('/');
});

export { dashboard, projectOverview, projectAccess, projectSettings, createProject };
