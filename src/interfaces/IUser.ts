/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-23 08:17:04
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 09:06:13
 * @Description: Definition for the User interface
 */

import { Document, Model } from 'mongoose';
import { IProject, IVariable } from '.';

interface IUser extends Document {
	userId: string;
	displayName: string;
	firstName: string | undefined;
	lastName: string | undefined;
	image: string;
	email: string;
	projects: IProject[];
	variables: IVariable[];
}

interface IUserModel extends Model<IUser> {}

export { IUser, IUserModel };
