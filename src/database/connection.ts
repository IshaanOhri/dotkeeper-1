/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:15:33
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-03 14:53:27
 * @Description: Connection to MongoDB database
 */

import mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import logger from '../log/config';

(async (): Promise<void> => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		logger.info('MongoDB database connection successful');
	} catch (error) {
		logger.error(`MongoDB database connection failed\n\n${error}`);
	}
})();
