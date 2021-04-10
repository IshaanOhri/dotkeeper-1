/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-04 12:15:25
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-07 02:49:57
 * @Description: MongoDB Model for Project
 */

import { model, Schema } from 'mongoose';
import { IProject, IProjectModel } from '../../interfaces';

const projectSchema: Schema<IProject, IProjectModel> = new Schema({
	projectId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	users: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			permission: {
				type: String,
				required: true,
				enum: ['owner', 'editor', 'viewer'],
			},
		},
	],
	variables: [
		{
			key: {
				type: String,
				// required: true
			},
			value: {
				type: Schema.Types.Mixed,
				// required:true
			},
		},
	],
	github: {
		type: String,
		default: null,
	},
	website: {
		type: String,
		default: null,
	},
});

projectSchema.statics.projectIdExists = async (projectId: string): Promise<boolean> => {
	const project: IProject | null = await Project.findOne({ projectId });

	if (project) return true;
	return false;
};

const Project: IProjectModel = model<IProject, IProjectModel>('Project', projectSchema);

export { Project };
