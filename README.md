# Langonic

> Nuxt.js project

## Build Setup

``` bash
# rename config file and write your vars
$ mv ".env(example)" ".env"

# create dir for mongodb
$ mkdir database
$ mongod --dbpath database --smallfiles

# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at 127.0.0.1:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```