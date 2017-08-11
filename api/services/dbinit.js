import mongoose from 'mongoose';
import Bluebird from 'bluebird';

mongoose.Promise = Bluebird;

mongoose.connect(process.env.databaseURL, {
  server: {
    poolSize: 10
  }
});

mongoose.connection.on('error', err => {
  global.console.error(`Database Connection Error: ${err}`);
  global.console.error('Админ сервер MongoDB Запусти!');
  process.exit(2);
});

mongoose.connection.on('connected', () => {
  global.console.info('Succesfully connected to MongoDB Database');
});
