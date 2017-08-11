<template>
  <li v-if="$store.state.lang !== lang"
      @click="$store.commit('SET_LANG', lang)"
      :style="`background: url('/img/lang_${lang}.png') 50% center no-repeat`">
  </li>
</template>

<style lang="sass" scoped>
li
  margin: -2px !important
  width: 100%
</style>

<script>
export default {
  // data() {
  //   return {

  //   }
  // },
  props: [
    'lang'
  ]

}
</script>