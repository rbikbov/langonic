import passport from 'koa-passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../../models/user';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.socialsFbClientID,
      clientSecret: process.env.socialsFbClientSecret,
      callbackURL: `${process.env.PREFIX}://${process.env.HOST}:${process.env
        .PORT}/${process.env.socialsAuthURL}/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, callback) => {
      let user = await User.findOne({ email: profile.email });
      if (user) {
        if (user.facebookId) {
          callback(null, user);
        } else {
          user.facebookId = profile.id;
          await user.save();
          callback(null, user);
        }
      } else {
        user = new User({
          username: profile.id,
          email: profile.email,
          vkontakteId: null,
          facebookId: profile.facebookId,
          googleId: null,
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

export default passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['user_friends', 'manage_pages']
});
