export default (cookies, cookieName) => {
  const regExp = new RegExp(`^${cookieName}=.+;`);
  const value = regExp.exec(cookies)[0].replace(`${cookieName}=`, '').replace(';', '');
  return value;
};
