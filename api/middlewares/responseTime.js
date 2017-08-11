const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

export default async (ctx, next) => {
  const startTime = new Date();
  await next();
  let ms = new Date() - startTime;
  if (ms < 10) {
    ms = `  ${ms}`;
  } else if (ms > 9 < ms < 100) {
    ms = ` ${ms}`;
  }

  global.console.log(
    `${ctx.method} | ${ctx.status} | ${ms} ms | ${host}:${port}${ctx.url}`
  );
};
