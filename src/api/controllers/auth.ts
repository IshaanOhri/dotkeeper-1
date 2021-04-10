/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-03 15:04:00
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-04 01:31:21
 * @Description: Defines functions for all authentication related routes
 */

import { Request, Response } from 'express';
import { catchAsync } from '../../middleware';

const callback = catchAsync(async (req: Request, res: Response) => {
	res.redirect('/dashboard');
});

const logout = catchAsync(async (req: Request, res: Response) => {
	req.logout();
	res.redirect('/');
});

const login = catchAsync(async (req: Request, res: Response) => {
	res.render('login', {
		layout: 'login',
	});
});

export { callback, logout, login };
