<template>
  <div class="type-view">
    <p>Article type</p>
    <p>Content: {{ content }}</p>
  </div>
</template>

<script>

const ArticleType = {
  name: 'article-type',
  props: {
    typeData: { type: Object },
    content:  { type: Array }
  },
  data () {
    return {}
  },
  apollo: {

  }
}

export default ArticleType;
</script>

<style lang="sass">
</style>
