<template>
  <div class="app">
    <img class="bg bg_first"
         src="/img/background_nebula.jpg">
    <img class="bg bg_second"
         src="/img/stars_and_lines.png">
    <img class="bg bg_third"
         src="/img/stars_and_lines.png">
  
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import MyHeader from '~/components/Header.vue';
// eslint-disable-next-line import/no-unresolved
import MyFooter from '~/components/Footer.vue';

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="sass">
@keyframes zoom
  0%,
  100%
    transform: scale(1)
  50%
    transform: scale(1.3)

@keyframes zoom_second
  0%,
  100%
    transform: scale(1) scaleX(-1)
  50%
    transform: scale(1.8) scaleX(-1)

.app
  width: 100%
  min-height: 100vh
  position: relative
  overflow: hidden

.bg
  position: fixed
  width: 100vw
  min-height: 100vh

.bg_first
  z-index: -3

.bg_second
  z-index: -2
  animation: zoom 35s ease-in-out infinite

.bg_third
  z-index: -1
  animation: zoom_second 35s ease-in-out infinite

.container
  width: 100%
  padding: 100px 0
  text-align: center

.button
  display: inline-block
  color: #fff
  font-weight: bold
  letter-spacing: 1px
  background-color: rgba(0,0,0,0)
  border: 2px solid #3B8070
  text-decoration: none
  text-transform: uppercase
  padding: 15px 45px
  cursor: pointer
  transition: 0.5s

  &:hover,
    color: #fff
    background-color: rgba(255,255,255,0.3)

  &:focus, &:active, &:visited
    animation: zoom 1s ease-in-out !important
    
  &-placeholder, input-placeholder
    text-align: center !important

  &.input_text
    cursor: auto

  &.nuxt-link-active
    color: #000
    background-color: #fff

.title
  color: #eaeaea
  font-weight: 300
  font-size: 2.5em
  margin: 0

.info
  font-weight: 300
  color: #9aabb1
  margin: 0
  margin-top: 10px

</style>
