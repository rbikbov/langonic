// import mongoose from 'mongoose';
import User from '../models/user';

const getAll = async ctx => {
  ctx.body = await User.find(
    { active: true },
    {
      _id: 1,
      firstName: 1,
      lastName: 1,
      photo: 1
    }
  );
};
const getById = async ctx => {
  try {
    ctx.body = await User.findById(ctx.params.id, {
      username: 1,
      firstName: 1,
      lastName: 1,
      birthday: 1,
      photo: 1,
      gender: 1
    });
  } catch (e) {
    ctx.status = 404;
  }
};
export default {
  getAll,
  getById
};
