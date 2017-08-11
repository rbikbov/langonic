import mongoose from 'mongoose';
import Course from '../models/course';
import WordGroup from '../models/wordGroup';
import Word from '../models/word';

const getRandomWords = async (length, trueWord) => {
  const wordsCount = await Word.count();
  const randomWords = [];
  const usedIndexes = [];

  while (randomWords.length < length) {
    const random = Math.floor(Math.random() * wordsCount);
    // @TODO await in loop
    // eslint-disable-next-line
    await Word.findOne().skip(random).exec((err, randomWord) => {
      if (err) throw err;
      if (randomWord.original !== trueWord && usedIndexes.indexOf(random) < 0) {
        randomWords.push(randomWord.translated);
        usedIndexes.push(random);
      }
    });
  }

  return new Promise(
    (resolve, reject) => (randomWords ? resolve(randomWords) : reject)
  );
};

const getTrueAnswerForCourse = async (progress, wordGroupId) => {
  const group = await WordGroup.findById(wordGroupId);
  const wordId = group.words[progress];
  const trueAnswer = await Word.findById(wordId);
  return new Promise(
    (resolve, reject) => (trueAnswer ? resolve(trueAnswer) : reject)
  );
};

const mixWords = (randomWords, trueWord) => {
  const allAnswers = randomWords.concat(trueWord);
  const random = Math.floor(Math.random() * allAnswers.length);
  const mem = allAnswers[random];
  allAnswers[random] = trueWord;
  allAnswers.pop();
  allAnswers.push(mem);
  return allAnswers;
};

const getAll = async ctx => {
  try {
    ctx.body = await Course.find(
      { user: mongoose.Types.ObjectId(ctx.state.user._id) },
      { _id: 1, title: 1, progress: 1, length: 1 }
    );
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
const getById = async ctx => {
  try {
    ctx.body = await Course.findById(ctx.params.id, {
      title: 1,
      progress: 1,
      length: 1
    });
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
const putAnswer = async ctx => {
  try {
    const course = await Course.findById(ctx.params.id);
    if (course) {
      let status = course.progress < course.length;
      let allAnswers;
      let currentWord;

      if (status) {
        const { answer } = ctx.request.body;
        currentWord = await getTrueAnswerForCourse(
          course.progress,
          course.wordGroup
        );

        if (!answer) {
          status = 'next';
        } else if (answer === currentWord.translated) {
          course.progress += 1;
          await course.save();
          status = true;
        } else {
          status = false;
        }

        if (course.progress < course.length) {
          currentWord = await getTrueAnswerForCourse(
            course.progress,
            course.wordGroup
          );
          const randomWords = await getRandomWords(3, currentWord.original);
          allAnswers = mixWords(randomWords, currentWord.translated);
          currentWord = currentWord.original;
        } else {
          currentWord = process.env.congratz;
          status = 'congratz';
        }
      } else {
        status = 'finised';
      }

      ctx.body = { allAnswers, currentWord, status };
    } else {
      ctx.throw(404);
    }
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
const createNew = async ctx => {
  try {
    ctx.body = await Course.find({
      user: mongoose.Types.ObjectId(ctx.state.user._id)
    });
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};

export default {
  getAll,
  getById,
  putAnswer,
  createNew
};
