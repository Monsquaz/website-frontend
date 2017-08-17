<template>
  <div class="type-view">
    <p>{{ content }}</p>
  </div>
</template>

<script>

import Util from '../Util';

const ArticleType = {
  name: 'article-type',
  props: {
    page: { type: Object }
  },
  data () {
    return {
      content: Util.getTranslation(this.page.content, 'en') // TODO: use lang from vuex state
    }
  },
  apollo: {

  }
}

export default ArticleType;
</script>

<style lang="sass">
</style>
