<template>
  <transition name="page">
    <section class="container error"
             v-if="show">
      <i class="fa fa-warning fa-5x fa-fw"></i>
      <div class="title">{{ error.statusCode }}</div>
      <div class="info">{{ error.message }}</div>
  
      <nuxt-link class="button"
                 :to="{ name: 'auth-login' }"
                 v-if="error.statusCode === 403">
        <span v-if="$store.state.lang === 'en'">Sign-In</span>
        <span v-else-if="$store.state.lang === 'ru'">Войти</span>
      </nuxt-link>
      <nuxt-link v-else
                 class="button"
                 :to="$router.options.base">
        <span v-if="$store.state.lang === 'en'">Homepage</span>
        <span v-else-if="$store.state.lang === 'ru'">На Главную</span>
      </nuxt-link>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      show: false
    }
  },
  props: ['error'],
  head() {
    return {
      title: `Langonic | Error | ${this.error.statusCode}`
    }
  },
  mounted() {
    setTimeout(() => { this.show = true }, 600)
  }
}
</script>

<style lang="sass" scoped>
.error
  .fa
    color: red
  .button
    margin-top: 50px

.page-leave-active
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  transform: translate(0, -100%)
</style>
