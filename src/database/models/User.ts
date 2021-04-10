/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-03 14:54:46
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-04 16:15:08
 * @Description: MongoDB Model for User
 */

import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from '../../interfaces';

const userSchema: Schema<IUser, IUserModel> = new Schema({
	userId: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
});

userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'users.userId',
});

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export { User };
