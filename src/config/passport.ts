import GoogleStrategy from 'passport-google-oauth20';
import { GOOGLE_CALLBACK, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '.';
import { User } from '../database/models';
import { IUser } from '../interfaces';
import logger from '../log/config';

module.exports = (passport: any) => {
	passport.use(
		new GoogleStrategy.Strategy(
			{
				clientID: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				callbackURL: GOOGLE_CALLBACK,
			},
			async (
				accessToken: string,
				refreshToken: string,
				profile: GoogleStrategy.Profile,
				done: GoogleStrategy.VerifyCallback
			) => {
				try {
					let loginUser: IUser | null = await User.findOne({ userId: profile.id });

					if (loginUser) {
						done(undefined, loginUser);
					} else {
						loginUser = await User.create({
							userId: profile.id,
							displayName: profile.displayName,
							firstName: profile.name?.givenName,
							lastName: profile.name?.familyName,
							image: profile.photos![0].value,
							email: profile.emails![0].value,
						});
						done(undefined, loginUser);
					}
				} catch (err) {
					logger.error(err);
				}
			}
		)
	);
	passport.serializeUser((user: IUser, done: GoogleStrategy.VerifyCallback) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id: string, done: GoogleStrategy.VerifyCallback) => {
		// let user: IUser | null = await User.findOne(id);

		// done(undefined,user)

		User.findById(id, (err: any, user: IUser) => {
			done(err, user);
		});
	});
};
