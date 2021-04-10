/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:22:14
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-08 16:13:54
 * @Description: Exports all response codes and response messages
 */

const status = {
	ok: 200,
	created: 201,
	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notFound: 404,
	serverError: 500,
};

const message = {
	homeRoute: 'Hello World. Welcome to NodeJS Server!',
	healthRoute: 'Node.js backend running successfully!',
	notFound: 'The requested route does not exist.',
	serverError: 'An internal server error occurred. Please try again.',
	invalidProjectId: 'No project found for entered ProjectID.',
	invalidFileType: 'invlaid file type',
	invalidPermission: 'The user does not have access to requested service.',
	emailNotFound: 'The entered Email ID is not found.',
};

export { status, message };
