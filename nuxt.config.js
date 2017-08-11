module.exports = {
  head: {
    title: 'Nuxt.js + Koa.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  },
  css: [
    '~assets/css/main.css',
    '~assets/font-awesome-4.7.0/css/font-awesome.min.css'
  ],
  loading: {
    color: 'yellow',
    failedColor: 'red',
    height: '5px',
    duration: 5000
  },
  build: {
    vendor: ['axios']
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      let position;
      if (savedPosition) {
        position = savedPosition;
      } else {
        // if no children detected
        if (to.matched.length < 2) {
          // scroll to the top of the page
          position = { x: 0, y: 0 };
        } else if (
          to.matched.some(r => r.components.default.options.scrollToTop)
        ) {
          // if one of the children has scrollToTop option set to true
          position = { x: 0, y: 0 };
        }
        // if link has anchor,  scroll to anchor by returning the selector
        if (to.hash) {
          position = { selector: to.hash };
        }
      }
      return position;
    }
  }
};
