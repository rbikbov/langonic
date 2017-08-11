<template>
  <section class="container course-id"
           v-if="course">
    <div class="title">
      <multi-lang :lang="$store.state.lang"
                  en="Course: "
                  ru="Курс: "
                  :postText='`"${course.title}"`' />
    </div>
  
    <div v-if="congratz"
         v-html="congratz"></div>
  
    <div class="progress-bar">
      <radial-progress-bar :diameter="200"
                           :completed-steps="course.progress"
                           :total-steps="course.length"
                           :strokeWidth="20">
        <span class="title">{{ course.progress }} / {{ course.length }}</span>
      </radial-progress-bar>
    </div>
  
    <br />
  
    <div v-if="currentWord"
         class="test">
      <a class="button"
         @click="translatePopup(currentWord)">
        <multi-lang :lang="$store.state.lang"
                    en="More about: "
                    ru="Подробнее о: "
                    :postText='`"${currentWord}"`' />
      </a>
  
      <div class="header">{{ currentWord }}</div>
  
      <div class="answers">
        <a class="button answer"
           v-for="(answer, i) in allAnswers"
           :key="i"
           @click="sendAnswer($event.target, answer)">{{ answer }}</a>
      </div>
    </div>
  
    <div v-else>
      <nuxt-link v-if="course.progress === course.length"
                 class="button"
                 :to="{name: 'word-groups'}">
        <multi-lang :lang="$store.state.lang"
                    en="Finished! Start new course"
                    ru="Пройден! Начать новый курс" />
      </nuxt-link>
      <a v-else-if="!allAnswers"
         class="button"
         id="start"
         @click="sendAnswer()">
        <multi-lang :lang="$store.state.lang"
                    :en="course.progress ? 'Continue' : 'Start'"
                    :ru="course.progress ? 'Продолжить' : 'Начать'" />
      </a>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios';
import popupCenter from '~/plugins/popupCenter';
import MultiLang from '~/components/MultiLang.vue'
import RadialProgressBar from '~/components/RadialProgressBar.vue';


export default {
  name: 'Courses-id',
  middleware: 'auth',
  async asyncData({ error, params, store, route }) {
    try {
      const { data } = await axios.get(`/courses/${params.id}`, { headers: { Authorization: store.state.authToken } });
      return { course: data, allAnswers: null, currentWord: null, style: '', congratz: null, word: null }
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang, RadialProgressBar },
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Курс' : 'Course'} ${this.course.title ? ' | ' + this.course.title : ''}`
    }
  },
  methods: {
    async sendAnswer(target, answer) {
      try {
        const { data } = await axios.put(
          `/courses/${this.$route.params.id}`,
          { answer },
          { headers: { Authorization: this.$store.state.authToken } }
        )
        this.styleChange(target, data.status);
        if (data.status && data.status !== 'next') this.course.progress += 1;
        if (data.status === "congratz") {
          [this.congratz, data.currentWord] = [data.currentWord, this.congratz]; // swap
        }
        setTimeout(() => {
          this.currentWord = data.currentWord;
          this.allAnswers = data.allAnswers;
        }, 1000)
      } catch (error) {
        this.error(error)
      }
    },
    styleChange(e, event) {
      if (e) {
        e.classList.add(event);
        setTimeout(() => {
          e.classList.remove(event);
        }, 500)
      }
    },
    translatePopup(original) {
      window.authWindow = popupCenter(
        `https://translate.google.ru/#en/ru/${original}`, original, 800, 600
      );
    }
  },
}
</script>

<style lang="sass" scoped>
.course-id
  .progress-bar
    .radial-progress-container
      display: inline-block
      width: 50%

  .test
    margin-top: 50px
    width: 50%
    display: inline-flex
    flex-direction: column
    font-weight: bold
    font-size: 2em
    text-transform: uppercase
    // transition: 1.5s

    .header
      background: white
      padding: 15px

    .answers
      display: flex
      flex-wrap: wrap
      flex-direction: row

      .answer
        display: flex
        flex-basis: 50%
        flex-frow: 1
        justify-content: center
        flex-direction: column
        padding: 15px
        font-weight: bold
        font-size: 1em

  .true
    background-color: green !important
    color: white

  .false
    background-color: red !important
    color: white

  .congratz

  .next
</style>
