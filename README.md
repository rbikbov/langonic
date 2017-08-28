# Langonic

> Описание
Соц. аутентификация.  
Загружаем субтитры не на русском языке.  
Из субтитров выбираем все слова длиной более 3 символов и без дефисов. Каждое слово пытаемся найти в нашей БД и перевести. Если не находим, то переводим через яндекс и добавляем в нашу БД.  
К субтитру создается группа слов (id слов и ссылка на сам файл субтитров). Так же создается курс (id на группу слов) привязанный к пользователю, который загрузил этот файл субтитров.  
Курс - это тесты (слово из загруженного файла и 4 варианта перевода на русском).  
Чужие группы слов (группы слов привязанные к файлам, которые загрузили не вы) можно использовать для прохождения по ним курсов и скачивать привязанный к ним файл субтитров.  
  
Проект не закончен.


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
