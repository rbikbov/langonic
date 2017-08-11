import Router from 'koa-router';
import multer from 'koa-multer';
import checkAuth from '../middlewares/checkAuth';
import auth from './auth';
import users from './users';
// import words from './words';
import wordGroups from './wordGroups';
import courses from './courses';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.PWD}/static/uploads/subtitles/`);
  },
  filename: (req, file, cb) => {
    const format = file.originalname.split('.').pop();
    const filename = file.originalname
      .replace(/\s+|\./g, '_')
      .replace(format, '');
    cb(null, `${filename}${Date.now()}.${format}`);
  }
});

const upload = multer({ storage });
const router = new Router({ prefix: '/api/v1' });

router
  // auth
  .post('/auth/logout', checkAuth, auth.logout)
  // auth-socials
  .get('/auth/vkontakte', auth.passportAuthVkontakte)
  .get('/auth/vkontakte/callback', auth.passportAuthVkontakte, auth.callback)
  .get('/auth/facebook', auth.passportAuthFacebook)
  .get('/auth/facebook/callback', auth.passportAuthFacebook, auth.callback)
  .get('/auth/google', auth.passportAuthGoogle)
  .get('/auth/google/callback', auth.passportAuthGoogle, auth.callback)
  // users
  .get('/users', users.getAll)
  .get('/users/:id', users.getById)
  // words
  // .get('/words', words.getAll)
  // .get('/words/:id', words.getById)
  // wordGroups
  .get('/word-groups', wordGroups.getAll)
  .post(
    '/word-groups',
    checkAuth,
    upload.single('wordGroup'),
    wordGroups.createNew
  )
  .get('/word-groups/:id', wordGroups.getById)
  .post('/word-groups/:id', checkAuth, wordGroups.startNew)
  // courses
  .get('/courses', checkAuth, courses.getAll)
  .get('/courses/:id', checkAuth, courses.getById)
  .put('/courses/:id', checkAuth, courses.putAnswer);
// .delete('/courses/:id', checkAuth, courses.answer)
// .post('/courses/:id', checkAuth, courses.answer)

export default router;
