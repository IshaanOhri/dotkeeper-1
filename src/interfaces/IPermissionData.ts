/*
 * @Author: Ishaan Ohri
 * @Date: 2021-04-08 14:23:06
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 14:23:57
 * @Description: Interface for permission data of a user related to a project
 */

import { Schema } from 'mongoose';

export interface IPermissionData {
	userId: Schema.Types.ObjectId;
	email: string;
	permission: string;
}
