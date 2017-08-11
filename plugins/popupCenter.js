export default (url, title, w, h) => {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  // eslint-disable-next-line
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;

  // eslint-disable-next-line
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
  );

  // Puts focus on the newWindow
  if (
    window.focus && newWindow !== undefined && newWindow.focus !== null && newWindow !== undefined
  ) {
    newWindow.focus();
  }

  return newWindow;
};
