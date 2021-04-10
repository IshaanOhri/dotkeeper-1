/*
 * @Author: Akshit Sadana
 * @Date: 2021-02-03 14:16:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 01:18:44
 * @Description: file generation logic and endpoint goes here
 */

import { Request, Response } from 'express';
import { Duplex } from 'stream';
import { message, status } from '../../config';
import { Project } from '../../database/models/Project';
import { HttpError } from '../../handlers';
import { IVariable, IProject, IRequest } from '../../interfaces';
import { catchAsync } from '../../middleware';

const bufferToStream = (buffer: string): Duplex => {
	const temp = new Duplex();
	temp.push(buffer);
	temp.push(null);
	return temp;
};

const toJSON = (data: { [index: string]: string }): Duplex => {
	return bufferToStream(JSON.stringify(data));
};

const toYAML = (data: { [index: string]: string }): Duplex => {
	let yamlFile: string = '';
	for (const key of Object.keys(data)) {
		yamlFile += `${key}: ${data[key]}\n`;
	}

	return bufferToStream(yamlFile.slice(0, yamlFile.length - 1));
};

const toENV = (data: { [index: string]: string }): Duplex => {
	let envFile = '';
	for (const key of Object.keys(data)) {
		envFile += `${key}=${data[key]}\n`;
	}

	return bufferToStream(envFile);
};

const fileDownload = catchAsync(async (req: IRequest, res: Response) => {
	const { fileType, projectId }: { fileType: string; projectId: string } = req.body;
	const project: IProject = req.project;

	let data: { [index: string]: string } = {};

	const keyValues: IVariable[] = project.variables;
	keyValues.forEach((keyValue: IVariable) => {
		data[keyValue.key] = keyValue.value;
	});

	let fileStream: Duplex;
	switch (fileType.toUpperCase()) {
		case 'JSON':
			res.setHeader('Content-disposition', `attachment; filename=${projectId}.json`);
			res.setHeader('Content-type', 'application/json');
			fileStream = toJSON(data);
			break;
		case 'YAML':
			res.setHeader('Content-disposition', `attachment; filename=${projectId}.yaml`);
			res.setHeader('Content-type', 'application/yaml');
			fileStream = toYAML(data);
			break;
		case 'ENV':
			res.setHeader('Content-disposition', `attachment; filename=${projectId}.env`);
			res.setHeader('Content-type', 'application/env');
			fileStream = toENV(data);
			break;
		default:
			throw new HttpError(status.badRequest, null, message.invalidFileType);
	}
	fileStream!.pipe(res);
});

const fromJSON = (data: string): { [index: string]: string } => {
	return JSON.parse(data);
};

const fromYAML = (data: string): { [index: string]: string } => {
	let obj: { [index: string]: string } = {};

	const eSlice: string[] = data.split('\n');
	eSlice.forEach((slice) => {
		const keyValue = slice.split(':');
		if (keyValue[0] === '') return;
		obj[keyValue[0]] = keyValue[1];
	});

	return obj;
};

const fromENV = (data: string): { [index: string]: string } => {
	let obj: { [index: string]: string } = {};

	const eSlice: string[] = data.split('\n');
	eSlice.forEach((slice) => {
		const keyValue = slice.split('=');
		if (keyValue[0] === '') return;
		obj[keyValue[0]] = keyValue[1];
	});

	return obj;
};

const importController = catchAsync(async (req: IRequest, res: Response) => {
	if (!req.file) {
		// handle error
		throw new HttpError(status.badRequest, null, 'no file found');
	}

	const project: IProject = req.project;

	const fileType = req.file.originalname.split('.')[1];

	let jsObj: any = null;
	const bufferData = req.file.buffer.toString();

	switch (fileType.toUpperCase()) {
		case 'JSON':
			jsObj = fromJSON(bufferData);
			break;
		case 'YAML':
			jsObj = fromYAML(bufferData);
			break;
		case 'ENV':
			jsObj = fromENV(bufferData);
			break;
	}

	let parsedVars: IVariable[] = [];

	for (const envKey of Object.keys(jsObj)) {
		// console.log(`key: ${key} :: value: ${jsObj[key]}`)
		const temp: IVariable = {
			key: envKey,
			value: jsObj[envKey],
		};
		parsedVars.push(temp);
	}

	project.variables = parsedVars;
	await project.save();

	// redirect here
	console.log(`/project/overview/${project.projectId}`);
	res.redirect(`/project/overview/${project.projectId}`);
});

export { fileDownload, importController };
