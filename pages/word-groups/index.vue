<template>
  <section class="container wordGroups"
           v-if="wordGroups">
    <div>
      <nuxt-link class="button"
                 v-for="(wordGroup, i) in wordGroups"
                 :key="i"
                 :to="{ name: 'word-groups-id', params: { id: wordGroup._id }}">
        {{ wordGroup.title }}
      </nuxt-link>
    </div>
  
    <br />
  
    <div class="form">
      <a class="button"
         v-if="$store.state.authUser"
         @click="show = !show">
        <multi-lang :lang="$store.state.lang"
                    en="Add new word group"
                    ru="Добавить новую группу слов" />
        <i class="fa fa-plus fa-2x fa-fw" />
      </a>
      <transition name="page">
        <form v-if="this.show"
              @submit.prevent="createWordGroup">
          <input class="button input_text"
                 type="text"
                 name="name"
                 :placeholder="`${$store.state.lang === 'ru' ? 'Название' : 'Title'}`"
                 required>
          <input class="button"
                 type="file"
                 name="wordGroup"
                 accept="wordGroup"
                 required>
          <button class="button"
                  type="submit">
            <multi-lang :lang="$store.state.lang"
                        :en="`${!load ? 'Create' : 'Wait...'}`"
                        :ru="`${!load ? 'Добавить' : 'Подождите...'}`" />
  
            <i :class="`fa ${!load ? 'fa-upload' : 'fa-spinner fa-pulse'} fa-2x fa-fw`"></i>
          </button>
        </form>
      </transition>
      <div v-if="error">{{ error }}</div>
    </div>
  
  </section>
</template>

<script>
import axios from '~/plugins/axios';
import MultiLang from '~/components/MultiLang.vue';

export default {
  name: 'WordGroup',
  async asyncData({ error }) {
    try {
      const { data } = await axios.get('/word-groups');
      return {
        wordGroups: data,
        error: null,
        load: false,
        show: false
      }
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang },
  head() {
    return {
      title: `Langonic | ${this.$store.state.lang === 'ru' ? 'Группы Слов' : 'Word Groups'} | ${this.wordGroups.length}`
    }
  },
  methods: {
    async createWordGroup(e) {
      this.load = true;
      const formData = new window.FormData(e.target);
      try {
        const { data } = await axios.post('/word-groups', formData);
        this.$router.push({ name: 'courses-id', params: { id: data.id } });
      } catch (error) {
        this.error = JSON.stringify(error.response);
        this.load = false;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.wordGroups
  .form
    display: inline-block
    width: 50%
    > a
      display: block
    form
      transition: 1s
      .button
        display: block
        width: 100%
        text-align: center

  div
    width: 50%
    // text-align: center
    display: inline-block

    .button
      display: block
      margin: 10px 0
      width: 100%
</style>
