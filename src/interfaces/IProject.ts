/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-04 13:47:30
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 17:48:30
 * @Description: Definition for the Project interface
 */

import { Document, Model } from 'mongoose';
import { IPermissionData } from './IPermissionData';
import { IVariable } from './IVariable';

interface IProject extends Document {
	projectId: string;
	name: string;
	users: IPermissionData[];
	variables: IVariable[];
	github: string | null;
	website: string | null;
}

interface IProjectModel extends Model<IProject> {
	projectIdExists(projectId: string): Promise<boolean>;
}

export { IProject, IProjectModel };
