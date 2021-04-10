/*
 * @Author: Akshit Sadana
 * @Date: 2021-02-03 14:16:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-09 01:18:57
 * @Description: file router is impl here
 */

import { Router } from 'express';
import { ensureAuth, permissionAuth, upload } from '../../middleware';
import { fileDownload, importController } from '../controllers/file';

const fileRouter: Router = Router();

// @desc	download project env variables in JSON, YAML, ENV format.
// @route	POST /file/download
fileRouter.post('/file/download', ensureAuth, permissionAuth(['owner', 'editor', 'viewer']), fileDownload);

// @desc	parses uploaded JSON, YAML, ENV config files
// @route	POST /file/import # multipart required
fileRouter.post(
	'/file/import',
	upload.single('file'),
	ensureAuth,
	permissionAuth(['owner', 'editor']),
	importController
);

export { fileRouter };
