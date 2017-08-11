<template>
  <span class="multilang">{{ text }}</span>
</template>

<script>
export default {
  computed: {
    text() {
      let text = '';
      if (this.preText) text += this.preText;
      if (this.lang === 'en') text += this.en;
      if (this.lang === 'ru') text += this.ru;
      if (this.postText) text += this.postText;
      return text;
    }
  },
  props: [
    'lang',
    'preText',
    'postText',
    'ru',
    'en',
  ]
}
</script>