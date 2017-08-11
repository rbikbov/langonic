export default async (ctx, next) => {
  if (ctx.state) {
    if (ctx.state.user) {
      await next();
    } else {
      ctx.throw(403, 'You are not authorized');
    }
  }
};
