<template>
  <section class="container courses"
           v-if="courses">
  
    <div>
      <nuxt-link class="button"
                 v-for="(course, i) in courses"
                 :key="i"
                 :to="{ name: 'courses-id', params: { id: course._id }}">
        {{ `${course.title} ( ${course.progress} / ${course.length} ) `}}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'Courses',
  middleware: 'auth',
  async asyncData({ error, store }) {
    try {
      const { data } = await axios.get('/courses', { headers: { Authorization: store.state.authToken } });
      return {
        courses: data,
        course: null,
        createStatus: null
      }
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang },
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Мои Курсы' : 'My Courses'} | ${this.courses.length}`
    }
  }
}
</script>

<style lang="sass" scoped>
.courses
  text-align: center

  div
    width: 50%
    display: inline-block

    .button
      width: 100%

</style>
