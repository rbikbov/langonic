<template>
  <header>
    <a class="button lang"
       @click="showDropdown = !showDropdown"
       @mouseover="showDropdown = true"
       @mouseleave="showDropdown = false"
       :style="`background: url('/img/lang_${this.$store.state.lang}.png') 50% center no-repeat`">
      <ul class="dropdown"
          v-if="showDropdown">
        <langs v-for="(lang, i) in langs"
               class="button"
               :lang="lang"
               :key="i">
        </langs>
      </ul>
    </a>
    <nuxt-link class="button"
               :to="{ name: 'users' }"
               exact>
      <multi-lang :lang="$store.state.lang"
                  en="Users "
                  ru="Пользователи " />
      <i class="fa fa-users fa-2x fa-fw"></i>
    </nuxt-link>
    <nuxt-link class="button"
               :to="{ name: 'word-groups' }"
               exact>
      <multi-lang :lang="$store.state.lang"
                  en="Word Groups "
                  ru="Группы слов " />
      <i class="fa fa-database fa-2x fa-fw"></i>
    </nuxt-link>
    <nuxt-link class="button"
               :to="{ name: 'courses' }"
               v-if="$store.state.authUser"
               exact>
      <multi-lang :lang="$store.state.lang"
                  en="My Courses "
                  ru="Мои курсы " />
      <i class="fa fa-book fa-2x fa-fw"></i>
    </nuxt-link>
    <nuxt-link class="button"
               :to="{ name: 'users-id', params: { id: $store.state.authUser._id } }"
               v-if="$store.state.authUser"
               exact>
      {{ `${$store.state.authUser.firstName} ${$store.state.authUser.lastName}` }}
      <i class="fa fa-user fa-2x fa-fw"></i>
    </nuxt-link>
    <nuxt-link class="button"
               :to="{ name: 'auth-login' }"
               v-if="!$store.state.authUser"
               exact>
      <multi-lang :lang="$store.state.lang"
                  en="Sign-In "
                  ru="Войти " />
      <i class="fa fa-sign-in fa-2x fa-fw"></i>
    </nuxt-link>
    <a class="button"
       v-if="$store.state.authUser"
       @click="logout">
      <multi-lang :lang="$store.state.lang"
                  en="Sign-Out "
                  ru="Выйти " />
      <i class="fa fa-sign-out fa-2x fa-fw"></i>
    </a>
  </header>
</template>

<style lang="sass" scoped>
header
  padding-top: 2px
  text-align: center

  .button
    height: 50px
    padding: 5px 25px
    vertical-align: middle

  .lang
    position: relative
    width: 100px

    .dropdown
      position: absolute
      left: -2px
      top: 48px
      list-style: none
      width: 100px
</style>

<script>
import Langs from '~/components/header/Langs.vue';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  data() {
    return {
      langs: ['en', 'ru'],
      showDropdown: false
    }
  },
  components: { Langs, MultiLang },
  mounted() {
    if (window) {
      if (window.localStorage.getItem('lang')) {
        this.$store.commit('SET_LANG', window.localStorage.getItem('lang'))
      }
    }
  }
}
</script>