/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-03 15:02:03
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 03:01:15
 * @Description: All authentication related routes
 */

import { Request, Response, Router } from 'express';
import passport from 'passport';
import { ensureAuth, ensureGuest } from '../../middleware';
import { dashboard, callback, logout, login } from '../controllers';

const authRouter: Router = Router();

// @desc	Auth with Google
// @route	GET /auth/google
authRouter.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
	})
);

// @desc	Google auth callback
// @route	GET /auth/google/callback
authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), callback);

// @desc Logout user
// @route GET /auth/logout
authRouter.get('/auth/logout', logout);

// @desc	Login/Landing page
// @route	GET /
authRouter.get('/', ensureGuest, login);

export { authRouter };
