import passport from 'koa-passport';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';

import User from '../../models/user';

passport.use(
  new VKontakteStrategy(
    {
      clientID: process.env.socialsVkClientID,
      clientSecret: process.env.socialsVkClientSecret,
      callbackURL: `${process.env.PREFIX}://${process.env.HOST}:${process.env
        .PORT}/${process.env.socialsAuthURL}/vkontakte/callback`,
      scope: ['email' /* ... and others, if needed */],
      lang: 'en',
      profileFields: ['email', 'city', 'bdate']
    },
    async (accessToken, refreshToken, params, profile, callback) => {
      let user = await User.findOne({ email: params.email });
      if (user) {
        if (user.vkontakteId) {
          callback(null, user);
        } else {
          user.googleId = profile.id;
          await user.save();
          callback(null, user);
        }
      } else {
        user = new User({
          username: profile.id,
          email: params.email,
          vkontakteId: profile.id,
          facebookId: null,
          googleId: null,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          birthday: profile.birthday,
          photo: profile.photos[0].value,
          gender: profile.gender
        });
        await user.save();
        callback(null, user);
      }
    }
  )
);

export default passport.authenticate('vkontakte', {
  authType: 'rerequest',
  scope: ['status', 'email', 'friends', 'notify']
});
