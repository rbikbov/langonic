<template>
  <section class="container word-group"
           v-if="wordGroup">
    <div class="title">
      <multi-lang :lang="$store.state.lang"
                  en="Word group:"
                  ru="Группа слов:"
                  :postText='`"${wordGroup.title}"`' />
    </div>
    <div class="info">
      <multi-lang :lang="$store.state.lang"
                  :preText="wordGroup.length"
                  en="words"
                  ru="слов" />
    </div>
  
    <div class="form">
      <a class="button"
         :href="wordGroup.file">
        <multi-lang :lang="$store.state.lang"
                    en="Download subtitles"
                    ru="Скачать субтитры" />
        <i class="fa fa-download"></i>
      </a>
  
      <a class="button"
         v-if="$store.state.authUser"
         @click="showForm = !showForm">
        <multi-lang :lang="$store.state.lang"
                    en="Start new course:"
                    ru="Начать новый курс:"
                    :postText='`"${wordGroup.title}"`' />
      </a>
  
      <a class="button"
         v-if="showForm"
         @click="showTitle = !showTitle">
        <multi-lang :lang="$store.state.lang"
                    en="Edit course title"
                    ru="Изменить название курса" />
      </a>
  
      <input class="button input_text"
             v-if="showTitle"
             type="text"
             :placeholder="`${$store.state.lang === 'ru' ? 'Новое название' : 'New title' }`"
             v-model="newTitle"
             @keyup.enter="startCourse" />
  
      <a class="button"
         v-if="showForm"
         @click="startCourse">
        <multi-lang :lang="$store.state.lang"
                    en="Start"
                    ru="Начать" />
      </a>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import MultiLang from '~/components/MultiLang.vue'

export default {
  name: 'WordGroup-id',
  async asyncData({ error, params }) {
    try {
      const { data } = await axios.get(`/word-groups/${params.id}`);
      return {
        wordGroup: data,
        newTitle: '',
        showStart: false,
        showForm: false,
        showTitle: false
      }
    } catch (response) {
      error({ statusCode: response.status, message: response.data })
    }
  },
  components: { MultiLang },
  head() {
    return {
      title: `Langonic | ${this.$store.state.ru ? 'Группа Слов' : 'Word Group'} ${this.wordGroup ? ' | ' + this.wordGroup.title : ''}`
    }
  },
  methods: {
    async startCourse() {
      try {
        const { data, status } = await axios.post(
          `/word-groups/${this.$route.params.id}`,
          { newTitle: this.newTitle },
          { headers: { Authorization: this.$store.state.authToken } }
        );
        if (status === 201) this.$router.push({ name: 'courses-id', params: { id: data } });
      } catch ({ status, message }) {
        this.error({ statusCode: status, message })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.word-group
  .form
    display: inline-block
    width: 40%

    .button
      display: block
      width: 100%
      text-align: center
</style>
