import multer from 'multer';
import { message, status } from '../config';
import { HttpError } from '../handlers';

// multer config
const upload = multer({
	// max upload size
	limits: {
		fileSize: 1 * 1024 * 1024,
	},
	// allowed extensions
	fileFilter(req, file, cb) {
		if (!file.originalname.toLocaleLowerCase().match(/\.(json|yaml|yml|env)$/)) {
			return cb(new HttpError(status.badRequest, null, message.invalidFileType));
		}
		cb(null, true);
	},
});

export { upload };
