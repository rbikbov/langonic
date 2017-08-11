import jwt from 'jsonwebtoken';
import User from '../models/user';

export default async (ctx, next) => {
  const token = ctx.cookies.get('authToken') || ctx.headers.authorization;

  if (token) {
    let tokenObj;
    try {
      tokenObj = jwt.verify(token, process.env.secret);
    } catch ({ message }) {
      ctx.cookies.set('authToken', message, {
        signed: true,
        expires: new Date(Date.now() - 86400000),
        path: '/'
      });
    }

    if (tokenObj) {
      const { _id } = tokenObj;
      const user = await User.findOne({ _id }, { password: 0 });
      if (user) {
        ctx.state.user = user;
      }
    }
  }
  await next();
};
