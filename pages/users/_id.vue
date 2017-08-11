<template>
  <section class="container user"
           v-if="user">
    <div class="title">{{ `${user.firstName} ${user.lastName}` }}</div>
    <img :src="user.photo">
    <div class="info">
      <multi-lang :lang="$store.state.lang"
                  en="Username: "
                  ru="Псевдоним: "
                  :postText="user.username" />
    </div>
    <div class="info">
      <multi-lang :lang="$store.state.lang"
                  en="Birthday: "
                  ru="Дата Рождения: "
                  :postText="dateFormat(user.birthday)" />
    </div>
    <div class="info">
      <multi-lang :lang="$store.state.lang"
                  en="Gender: "
                  ru="Пол: " />
      <i :class="`fa fa-${user.gender} fa-2x fa-fw`"></i>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'Users-id',
  async asyncData({ error, params }) {
    try {
      const { data } = await axios.get(`/users/${params.id}`)
      return { user: data }
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang },
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Пользователь' : 'User'} | ${this.user.firstName} ${this.user.lastName}`
    }
  },
  methods: {
    dateFormat: (birthday) => {
      const date = new Date(birthday);
      const dd = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();
      const mm = (date.getMonth() + 1) < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
      const yyyy = date.getFullYear();
      return (`${dd} / ${mm} / ${yyyy}`);
    }
  }
}
</script>

<style lang="sass" scoped>
.user
  img
    width: 200px
    border-radius: 50%

// .title
//   margin-top: 50px

// .info
//   font-weight: 300
//   color: #9aabb1
//   margin: 0
//   margin-top: 10px

// .button
//   margin-top: 50px

</style>
