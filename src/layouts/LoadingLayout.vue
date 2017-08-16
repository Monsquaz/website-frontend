<template>
  <div class="layout-view">
    Loading
  </div>
</template>

<script>

const LoadingLayout = {
  name: 'basic-layout',
  props: {
    layoutData:     { type: Object },
    typeComponent:  { type: String },
    typeData:       { type: Object },
    content:        { type: Array  }
  },
  data () {
    return {}
  },
  apollo: {

  }
}

export default LoadingLayout ;
</script>

<style lang="sass">

</style>
