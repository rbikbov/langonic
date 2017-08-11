import Word from '../models/word';

const getAll = async ctx => {
  try {
    ctx.body = await Word.find();
  } catch ({ message }) {
    global.console.error({ message });
  }
};
const getById = async ctx => {
  try {
    ctx.body = await Word.findById(ctx.params.id);
  } catch ({ message }) {
    global.console.error(message);
    ctx.status = 404;
  }
};
export default {
  getAll,
  getById
};
