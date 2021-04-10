/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '.';
import { message, status } from '../config';
import { Project } from '../database/models';
import { HttpError } from '../handlers';
import { IProject, IRequest } from '../interfaces';
import { IPermissionData } from '../interfaces/IPermissionData';

const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
};

const ensureGuest = async (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		res.redirect('/dashboard');
	} else {
		return next();
	}
};

const permissionAuth = (allowedPermission: string[]) => {
	const auth = catchAsync(
		async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
			const { projectId }: { projectId: string } = req.body;

			const project: IProject | null = await Project.findOne({ projectId });

			if (!project) throw new HttpError(status.badRequest, null, message.invalidProjectId);

			req.project = project;

			const permissionData: IPermissionData | undefined = project.users.find(
				({ userId }: IPermissionData) => String(userId) == req.user._id
			);

			if (!permissionData) {
				res.render('error/404');
				return;
			}
			if (!allowedPermission.includes(permissionData.permission))
				throw new HttpError(status.forbidden, null, message.invalidPermission);

			next();
		}
	);

	return auth;
};

export { ensureAuth, ensureGuest, permissionAuth };
