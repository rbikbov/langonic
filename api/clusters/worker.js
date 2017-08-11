import Koa from 'koa';
import Nuxt from 'nuxt';
import passport from 'koa-passport';
import bodyParser from 'koa-bodyparser';
import nuxtConfig from '../../nuxt.config';

import errorHandler from '../middlewares/errorHandler';
import responseTime from '../middlewares/responseTime';
import stateUser from '../middlewares/stateUser';
import controllers from '../controllers';

import '../../api/services/dbinit';

const app = new Koa();
nuxtConfig.dev = !(app.env === 'production');
const nuxt = new Nuxt(nuxtConfig);
const port = process.env.PORT || 3000;

// Build only in dev mode
if (nuxtConfig.dev) {
  nuxt.build().catch(error => {
    global.console.error(error);
    process.exit(1);
  });
}

app.keys = [process.env.secret];

app
  .use(errorHandler)
  .use(responseTime)
  .use(bodyParser())
  .use(passport.initialize())
  // .use(passport.session())
  .use(stateUser)
  .use(controllers.routes(), controllers.allowedMethods())
  .use(async ctx => {
    ctx.status = 200;
    await nuxt.render(ctx.req, ctx.res);
  })
  .listen(port);

process.on('unhandledRejection', (reason, p) => {
  global.console.error('Unhandled Rejection at: Promise ', p, reason);
});
