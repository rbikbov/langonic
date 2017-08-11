import fs from 'fs';
import Promise from 'bluebird';
import yandexTranslate from 'yandex-translate';
import storageCleaner from '../services/storageCleaner';
import Word from '../models/word';
import WordGroup from '../models/wordGroup';
import Course from '../models/course';

const translate = yandexTranslate(process.env.yandexTranslateKey);

const readFile = Promise.promisify(fs.readFile);

storageCleaner({
  model: WordGroup,
  fields: { file: 1 },
  dirPath: `${process.env.PWD}/static/uploads/subtitles/`,
  strForReplaceInDbField: '/uploads/subtitles/',
  strForCheckFormat: '.srt'
});

const uniqueStrInArray = words => {
  const dict = {};
  const arr = [];
  words.forEach(str => {
    const word = str.toLowerCase();
    if (!dict[word]) {
      dict[word] = true;
      arr.push(word);
    }
  });
  return arr;
};

const getAll = async ctx => {
  try {
    ctx.body = await WordGroup.find({}, { _id: 1, title: 1, length: 1 });
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
const getById = async ctx => {
  try {
    ctx.body = await WordGroup.findById(ctx.params.id, { words: 0 });
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
const startNew = async ctx => {
  try {
    const wordGroup = await WordGroup.findById(ctx.params.id, { words: 0 });
    const { newTitle } = ctx.request.body;

    const newCourse = new Course({
      title: newTitle || wordGroup.title,
      user: ctx.state.user._id,
      wordGroup: wordGroup._id,
      length: wordGroup.length
    });
    await newCourse.save();

    ctx.status = 201;
    ctx.body = newCourse._id;
  } catch ({ message }) {
    ctx.throw(message);
  }
};
const createNew = async ctx => {
  try {
    if (
      ctx.req.file &&
      ctx.req.file.mimetype.indexOf('application/x-subrip') === 0
    ) {
      let allWords = await readFile(`${ctx.req.file.path}`, 'utf8');
      allWords = allWords.replace(/\r\n|\r|\n|\\/g, ' ');
      allWords = allWords.match(/([a-z]{3,})(-[a-z]+)?/gim);
      allWords = uniqueStrInArray(allWords);

      if (!allWords) ctx.throw(400);

      const count = allWords.length - 1;
      const wordGroup = [];
      const regExp = new RegExp(/[A-Za-z]+/gim);

      await Promise.each(allWords, async (original, i) => {
        let from;
        let word = await Word.findOne({ original });

        if (word) {
          from = 'Из БД';
          word.frequency = +word.frequency + 1;
          await word.save();
          global.console.log(
            `${i} / ${count} | ${from} | ${word.original}: ${word.translated}`
          );
          wordGroup.push(word._id);
        } else {
          translate.translate(original, { to: 'ru' }, async (err, res) => {
            if (
              !err &&
              res.text &&
              !`${res.text}`.match(regExp) &&
              `${res.text}`.toLowerCase() !== original
            ) {
              from = 'Из Yandex';
              word = new Word({
                original,
                translated: `${res.text}`
              });
              await word.save();
              global.console.log(
                `${i} / ${count} | ${from} | ${word.original}: ${word.translated}`
              );
              wordGroup.push(word._id);
            } else {
              from = 'Не перевелось';
              global.console.log(
                `${i} / ${count} | ${from} | ${original}: ${res.text}`
              );
            }
          });
        }
      });

      const newWordGroup = new WordGroup({
        title: ctx.req.body.name || ctx.req.file.filename,
        file: ctx.req.file.path.replace(`${process.env.PWD}/static/`, '/'),
        words: wordGroup,
        length: wordGroup.length
      });
      await newWordGroup.save();

      const newCourse = new Course({
        title: newWordGroup.title,
        user: ctx.state.user._id,
        wordGroup: newWordGroup._id,
        length: wordGroup.length
      });
      await newCourse.save();

      ctx.status = 201;
      ctx.body = { id: newCourse._id };
    }
  } catch ({ message }) {
    ctx.throw(400, message);
    global.console.log(message);
  }
};

export default {
  getAll,
  getById,
  startNew,
  createNew
};
