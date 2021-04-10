/*
 * @Author: Ishaan Ohri
 * @Date: 2021-02-03 14:14:17
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2021-04-07 03:16:44
 * @Description: Main driver file for the server
 */

// Connect to MongoDB Database
require('./database/connection');

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './api/routes';
import { PORT, HOST } from './config';
import logger from './log/config';
import { helpers, responseHandler } from './middleware';
import * as useragent from 'express-useragent';
import passport from 'passport';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import path from 'path';
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

// Initializing Express App
const app: Application = express();

// CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport
require('./config/passport')(passport);

// Initialize MongoStore
const MongoStore = require('connect-mongo')(session);

// Middleware for exposing user-agent
app.use(useragent.express());

// Setup handlebars
app.engine(
	'.hbs',
	handlebars({
		defaultLayout: 'main',
		extname: '.hbs',
		helpers,
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Express sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		// cookie:{secure:true} Works only with HTTPS
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// remove this after testing
app.get('/test', (req, res) => {
	res.sendFile(path.join(__dirname, './views/download.html'));
});

// Import routers
app.use(router);

// Not found handler
// app.use(notFound);

// Default route
app.use('*', (req: Request, res: Response) => {
	res.redirect('/');
});

// All response handlers
app.use(responseHandler);

// Start Express App
app.listen(PORT, HOST, () => {
	logger.info(`🚀 Server running on http://${HOST}:${PORT} 🚀`);
});
