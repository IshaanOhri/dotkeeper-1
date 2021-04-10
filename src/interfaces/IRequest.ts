/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-28 23:42:27
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-04 15:43:11
 * @Description: Definition of IRequest interface to add user
 */

import { Request } from 'express';
import { IProject } from './IProject';
import { IUser } from './IUser';

export interface IRequest extends Request {
	user: IUser;
	project: IProject;
}
