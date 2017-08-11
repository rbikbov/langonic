import axios from 'axios';

const options = {};
// The server-side needs a full url to works
if (process.SERVER_BUILD) {
  options.baseURL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;
}
// если браузер
if (process.browser) {
  options.baseURL = `http://127.0.0.1:3000/api/v1`;
  // if (window.localStorage.getItem('authToken')) {
  //   options.headers = { Authorization: window.localStorage.getItem('authToken') };
  // }
}

export default axios.create(options);
