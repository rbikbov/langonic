<template>
  <section class="container">
    <div class="title">This page is loaded from the {{ name }}</div>
    <div class="info"
         v-if="name === 'client'">Please refresh the page</div>
    <nuxt-link class="button"
               to="/">
      Home page
    </nuxt-link>
  </section>
</template>
<script>
export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  margin-top: 50px

.info
  font-weight: 300
  color: #9aabb1
  margin: 0
  margin-top: 10px

.button
  margin-top: 50px
</style>
