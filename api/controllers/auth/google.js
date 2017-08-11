import passport from 'koa-passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../../models/user';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.socialsGoogleClientID,
      clientSecret: process.env.socialsGoogleClientSecret,
      callbackURL: `${process.env.PREFIX}://${process.env.HOST}:${process.env
        .PORT}/${process.env.socialsAuthURL}/google/callback`,
      profileFields: ['profile', 'email', 'openid']
    },
    async (accessToken, refreshToken, profile, callback) => {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        if (user.googleId) {
          callback(null, user);
        } else {
          user.googleId = profile.id;
          await user.save();
          callback(null, user);
        }
      } else {
        user = new User({
          username: profile.id,
          email: profile.emails[0].value,
          vkontakteId: null,
          facebookId: null,
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          birthday: null,
          photo: profile.photos[0].value,
          gender: profile.gender
        });
        await user.save();
        callback(null, user);
      }
    }
  )
);

export default passport.authenticate('google', {
  scope: ['profile', 'email', 'openid']
});
