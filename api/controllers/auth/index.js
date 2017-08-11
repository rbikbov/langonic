import passport from 'koa-passport';
import jwt from 'jsonwebtoken';

import passportAuthVkontakte from './vkontakte';
import passportAuthGoogle from './google';
import passportAuthFacebook from './facebook';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => done(null, user)).catch(done);
// });

export default {
  logout: async ctx => {
    ctx.cookies.set('authToken', 123, {
      signed: true,
      expires: new Date(Date.now() - 86400000),
      path: '/'
    });

    ctx.cookies.set('user', 123, {
      signed: true,
      expires: new Date(Date.now() - 86400000),
      path: '/'
    });

    ctx.status = 200;
  },
  callback: ctx => {
    const token = jwt.sign({ _id: ctx.state.user._id }, process.env.secret, {
      expiresIn: '168h'
    });

    ctx.body = `<script>
                  window.onload = function () {
                    window.localStorage.setItem('authToken', '${token}');
                    window.opener.location.href = '/users/${ctx.state.user
                      ._id}';
                    window.close();
                  }
                </script>`;

    ctx.cookies.set('authToken', token, {
      signed: true,
      expires: new Date(Date.now() + 14 * 86400000),
      path: '/'
    });
  },
  passportAuthVkontakte,
  passportAuthGoogle,
  passportAuthFacebook
};
