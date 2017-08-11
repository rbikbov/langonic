<template>
  <section class="container users"
           v-if="users">
    <div class="users">
      <nuxt-link class="link button"
                 v-for="(user, i) in users"
                 :key="i"
                 :to="{name: 'users-id', params: {id: user._id}}">
        <img class="photo"
             :src="user.photo">
        <h5>{{ `${user.firstName} ${user.lastName}` }}</h5>
      </nuxt-link>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@mixin flexbox() 
  display: -webkit-box
  display: -moz-box
  display: -ms-flexbox
  display: -webkit-flex
  display: flex


@mixin flex($values) 
  -webkit-box-flex: $values
  -moz-box-flex:  $values
  -webkit-flex:  $values
  -ms-flex:  $values
  flex:  $values


@mixin order($val) 
  -webkit-box-ordinal-group: $val  
  -moz-box-ordinal-group: $val     
  -ms-flex-order: $val     
  -webkit-order: $val  
  order: $val



.container
  .title
    margin: 50px 0

  .users
    @include flexbox()
    justify-content: center
    
    .link
      @include flex(0 0 20%)
      // @include order(4)

    .photo
      border-radius: 50%
</style>

<script>
import axios from '~/plugins/axios';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'Users',
  async asyncData(error) {
    try {
      const { data } = await axios.get('/users');
      return { users: data }
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang },
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Пользователи' : 'Users'} | ${this.users.length}`
    }
  }
}
</script>