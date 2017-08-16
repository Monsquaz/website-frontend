<template>
  <div class="type-view">
    Loading type
  </div>
</template>

<script>

const LoadingType = {
  name: 'loading-type',
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

export default LoadingType;
</script>

<style lang="sass">
</style>
