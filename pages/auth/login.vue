<template>
  <section class="container">
    <div class="title">
      <multi-lang :lang="$store.state.lang"
                  en="Sign-In "
                  ru="Войти " />
      <i class="fa fa-sign-in"
         scale="1"></i>
    </div>
    <div class="info">
      <ul>
        <li>
          <a class="button"
             @click="authByOauth('vk')">
            <i class="fa fa-vk fa-2x fa-fw"></i>
          </a>
          <br>
          <a class="button"
             @click="authByOauth('fb')">
            <i class="fa fa-facebook fa-2x fa-fw"></i>
          </a>
          <br>
          <a class="button"
             @click="authByOauth('google')">
            <i class="fa fa-google fa-2x fa-fw"></i>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import popupCenter from '~/plugins/popupCenter';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'login',
  middleware: 'notAuth',
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Войти' : 'Sign-In'}`
    }
  },
  components: { MultiLang },
  methods: {
    authByOauth(type) {
      let url;
      switch (type) {
        case 'vk':
          url = '/api/v1/auth/vkontakte';
          break;
        case 'fb':
          url = '/api/v1/auth/facebook';
          break;
        case 'google':
          url = '/api/v1/auth/google';
          break;
        default:
          url = '/api/v1/auth/vkontakte';
          break;
      }
      window.authWindow = popupCenter(
        url, 'Authorization', 800, 600
      );
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  margin-top: 30px

.info
  font-weight: 300
  color: #9aabb1
  margin: 0
  margin-top: 10px

.button
  margin-top: 30px
  width: 30%
</style>